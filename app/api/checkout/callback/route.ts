import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/prisma/prisma-client'
import { sendEmail } from '@/lib/send-email'
import { OrderSuccessTemplate } from '@/components/shared/email-temples/order-success'
import { OrderStatus } from '@prisma/client'
import type { WayForPayCallbackData } from '@/@types/way-for-pay'
import React from 'react'

const WAYFORPAY_SECRET = process.env.WAYFORPAY_SECRET_KEY || ''

function hmacMd5Hex(secret: string, payload: string) {
	return crypto.createHmac('md5', secret).update(payload).digest('hex')
}

async function parseBody(req: NextRequest): Promise<any> {
	try {
		return await req.json()
	} catch {
		const txt = await req.text()
		try {
			return JSON.parse(txt)
		} catch {
			const params = new URLSearchParams(txt)
			return Object.fromEntries(params.entries())
		}
	}
}

export async function POST(req: NextRequest) {
	try {
		if (!WAYFORPAY_SECRET) {
			console.error('[WFP CALLBACK] WAYFORPAY_SECRET_KEY is not set')
			return NextResponse.json(
				{ error: 'Server not configured' },
				{ status: 500 }
			)
		}

		const raw = await parseBody(req)
		const body = raw as WayForPayCallbackData

		console.log('[WFP CALLBACK] received', {
			merchantAccount: body?.merchantAccount,
			orderReference: body?.orderReference,
			amount: body?.amount,
			transactionStatus: body?.transactionStatus,
		})

		const partsToSign = [
			body?.merchantAccount ?? '',
			String(body?.orderReference ?? ''),
			String(body?.amount ?? ''),
			body?.currency ?? '',
			body?.authCode ?? '',
			body?.cardPan ?? '',
			body?.transactionStatus ?? '',
			String(body?.reasonCode ?? ''),
		]
		const stringToSign = partsToSign.join(';')
		const expectedSignature = hmacMd5Hex(WAYFORPAY_SECRET, stringToSign)

		const incomingSignature =
			(body?.merchantSignature as string) || (body?.signature as string) || ''

		if (
			!incomingSignature ||
			expectedSignature.toLowerCase() !== incomingSignature.toLowerCase()
		) {
			console.warn('[WFP CALLBACK] invalid signature', {
				expected: expectedSignature,
				incoming: incomingSignature,
			})
			return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
		}

		const orderId = Number(body.orderReference)
		const order = await prisma.order.findUnique({ where: { id: orderId } })

		if (!order) {
			console.warn('[WFP CALLBACK] order not found', orderId)

			return NextResponse.json({ error: 'Order not found' }, { status: 404 })
		}

		const txStatus = String(body.transactionStatus || '').toLowerCase()

		if (
			txStatus === 'approved' ||
			txStatus === 'ok' ||
			txStatus === 'successful'
		) {
			await prisma.order.update({
				where: { id: order.id },
				data: { status: OrderStatus.SUCCEEDED },
			})

			try {
				const items = order.items as unknown as Array<any>
				await sendEmail(
					order.email,
					'Glance / Ваше замовлення успішно оформлено',
					React.createElement(OrderSuccessTemplate, {
						orderId: order.id,
						items,
					})
				)
			} catch (emailErr) {
				console.error('[WFP CALLBACK] email send failed', emailErr)
			}
		} else if (
			txStatus === 'declined' ||
			txStatus === 'failed' ||
			txStatus === 'rejected'
		) {
			await prisma.order.update({
				where: { id: order.id },
				data: { status: OrderStatus.CANCELLED },
			})
		} else {
			await prisma.order.update({
				where: { id: order.id },
				data: { status: OrderStatus.PENDING },
			})
		}

		const time = Math.floor(Date.now() / 1000)
		const responseString = `${body.orderReference};accept;${time}`
		const responseSignature = hmacMd5Hex(WAYFORPAY_SECRET, responseString)

		return NextResponse.json(
			{
				orderReference: body.orderReference,
				status: 'accept',
				time,
				signature: responseSignature,
			},
			{ status: 200 }
		)
	} catch (err) {
		console.error('[WFP CALLBACK] unexpected error', err)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
