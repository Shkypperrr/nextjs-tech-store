import { Product } from '@prisma/client'
import { axiosInstance } from './instance'

export const getRecommended = async (productId: number) => {
	const { data } = await axiosInstance.get<Product[]>(
		`/products/recommended/${productId}`
	)

	return data
}
