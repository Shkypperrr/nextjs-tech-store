import { WayForPayRequest } from '@/@types/way-for-pay'
import crypto from 'crypto'

interface CreatePaymentProps {
	amount: number
	description: string
	orderId: number
}

const MERCHANT_ACCOUNT = process.env.WAYFORPAY_MERCHANT_ACCOUNT!
const MERCHANT_SECRET = process.env.WAYFORPAY_SECRET_KEY!
const MERCHANT_DOMAIN =
	process.env.WAYFORPAY_MERCHANT_DOMAIN_NAME! || 'localhost'

export async function createPayment({
	amount,
	orderId,
}: CreatePaymentProps): Promise<WayForPayRequest> {
	const orderDate = Math.floor(Date.now() / 1000)

	const requestData: Omit<WayForPayRequest, 'merchantSignature'> = {
		merchantAccount: MERCHANT_ACCOUNT,
		merchantDomainName: MERCHANT_DOMAIN,
		orderReference: String(orderId),
		orderDate,
		amount,
		currency: 'UAH',
		productName: ['Оплата замовлення'],
		productPrice: [amount],
		productCount: [1],
		returnUrl: process.env.WAYFORPAY_RETURN_URL!,
		serviceUrl: process.env.WAYFORPAY_CALLBACK_URL!,
	}

	const signatureData = [
		requestData.merchantAccount,
		requestData.merchantDomainName,
		requestData.orderReference,
		requestData.orderDate,
		requestData.amount,
		requestData.currency,
		...requestData.productName,
		...requestData.productCount,
		...requestData.productPrice,
	]

	const stringToSign = signatureData.join(';')
	const merchantSignature = crypto
		.createHmac('sha1', MERCHANT_SECRET)
		.update(stringToSign)
		.digest('hex')

	return {
		...requestData,
		merchantSignature,
	}
}

export function getPaymentUrl(payload: WayForPayRequest): string {
	const form = Object.entries(payload)
		.map(
			([key, value]) =>
				`<input type="hidden" name="${key}" value="${
					Array.isArray(value) ? value.join(';') : value
				}"/>`
		)
		.join('')

	return `data:text/html,<form method="POST" action="https://secure.wayforpay.com/pay">${form}<script>document.forms[0].submit()</script></form>`
}
