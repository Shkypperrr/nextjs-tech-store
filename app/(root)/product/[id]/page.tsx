import { ProductForm } from '@/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage(props: {
	params: Promise<{ id: string }>
}) {
	const { id } = await props.params
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
