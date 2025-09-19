import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { updateTotalAmount } from '@/lib/update-total-amount'

export async function GET(req: NextResponse) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
		})

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json(
			{ message: 'Не вдалося отримати корзину' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextResponse) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
			},
		})

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
				},
			})
		}

		const updateUserCart = await updateTotalAmount(token)

		const resp = NextResponse.json(updateUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Не вдалося створити корзину' },
			{ status: 500 }
		)
	}
}
