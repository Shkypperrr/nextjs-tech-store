import { ProductForm, ProductImage } from '@/components/shared'

import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

type PageProps = {
	params: {
		id: string
	}
}

export default async function ProductPage({ params: { id } }: PageProps) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			items: {
				orderBy: { price: 'asc' },
			},
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
		},
	})

	if (!product) {
		return notFound()
	}

	return (
		<div className='mx-20 flex flex-col my-10'>
			<ProductForm product={product} />
		</div>
	)
}
