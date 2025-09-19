export interface WayForPayRequest {
	merchantAccount: string
	merchantDomainName: string
	orderReference: string
	orderDate: number
	amount: number
	currency: string
	productName: string[]
	productPrice: number[]
	productCount: number[]
	returnUrl: string
	serviceUrl: string
	merchantSignature: string
}

export interface WayForPayResponse {
	merchantAccount: string
	orderReference: string
	amount: number
	currency: string
	authCode: string
	cardPan: string
	transactionStatus: string
	reasonCode: string
	merchantSignature: string
}

export type WayForPayCallbackData = {
	merchantSignature: string
	merchantAccount: string
	orderReference: string
	amount: number
	currency: 'UAH' | 'USD' | 'EUR'
	authCode?: string
	cardPan?: string
	transactionStatus: 'Approved' | 'Pending' | 'Declined'
	reason?: string
	reasonCode?: number
	fee?: number
	paymentSystem?: string
	signature: string
}
