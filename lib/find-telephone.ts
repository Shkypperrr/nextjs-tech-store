import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
	query?: string
	sortBy?: string
	memory?: string
	colors?: string
	ram?: string
	brand?: string
	priceFrom?: string
	priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 100000

const parseNum = (v?: string, fallback: number = 0) => {
	if (v === undefined || v === '') return fallback
	const n = Number(v)
	return Number.isFinite(n) ? n : fallback
}

export const findTelephone = async (
	categoryId: number,
	params: GetSearchParams
) => {
	const memory = params.memory?.split(',').map(Number).filter(Number.isFinite)
	const colors = params.colors?.split(',').map(Number).filter(Number.isFinite)

	const minPrice = parseNum(params.priceFrom, DEFAULT_MIN_PRICE)
	const maxPrice = parseNum(params.priceTo, DEFAULT_MAX_PRICE)

	const itemWhere = {
		...(memory && memory.length ? { memoryId: { in: memory } } : {}),
		...(colors && colors.length ? { colorId: { in: colors } } : {}),
		price: { gte: minPrice, lte: maxPrice },
	} as const

	const category = await prisma.category.findUnique({
		where: { id: categoryId },
		include: {
			products: {
				orderBy: { id: 'desc' },
				where: {
					items: { some: itemWhere },
				},
				include: {
					items: {
						where: itemWhere,
						orderBy: { price: 'asc' },
					},
				},
			},
		},
	})

	return category
}
