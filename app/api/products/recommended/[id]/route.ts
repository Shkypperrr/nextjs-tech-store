import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const productId = Number(params.id)

	const currentProduct = await prisma.product.findUnique({
		where: { id: productId },
		include: { category: true },
	})

	if (!currentProduct) {
		return NextResponse.json([])
	}

	const recommended = await prisma.product.findMany({
		where: {
			categoryId: currentProduct.categoryId,
			NOT: { id: productId },
		},
		take: 6,
		include: { items: true },
	})

	return NextResponse.json(recommended)
}
