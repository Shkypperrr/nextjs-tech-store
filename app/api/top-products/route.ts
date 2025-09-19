import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	const categories = await prisma.category.findMany()

	const results = await Promise.all(
		categories.map(async cat => {
			const products = await prisma.product.findMany({
				where: { categoryId: cat.id },
				take: 2,
				orderBy: { createdAt: 'desc' },
				include: { items: true },
			})
			return {
				category: { id: cat.id },
				products,
			}
		})
	)

	return NextResponse.json(results)
}
