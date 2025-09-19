import { ProductForm, ProductImage } from '@/components/shared'
import { Container } from '@/components/shared/container'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
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
