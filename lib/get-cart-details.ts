import { CartDTO } from '@/services/dto/cart.dto'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	disabled: boolean
	memoryId: number | null
	colorId: number | null
}

interface ReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	if (!data || !data.items) {
		return {
			items: [],
			totalAmount: 0,
		}
	}

	const items = data.items.map(item => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		memoryId: item.productItem.memoryId,
		colorId: item.productItem.colorId,
		disabled: false,
	})) as CartStateItem[]

	return {
		items,
		totalAmount: data.totalAmount,
	}
}
