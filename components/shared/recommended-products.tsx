'use client'

import { getRecommended } from '@/services/recommend'
import { Product } from '@prisma/client'
import React from 'react'
import { Title } from './title'
import { ProductCard } from './product-card'
import { Skeleton } from '../ui/skeleton'

interface Props {
	productId: number
}

export const RecommendedProducts: React.FC<Props> = ({ productId }) => {
	const [products, setProducts] = React.useState<Product[]>([])
	const [loading, setLoading] = React.useState<boolean>(true)

	React.useEffect(() => {
		async function fetchRecommended() {
			try {
				const data = await getRecommended(productId)
				setProducts(data)
			} finally {
				setLoading(false)
			}
		}
		fetchRecommended()
	}, [productId])

	if (!loading && products.length === 0) {
		return null
	}

	return (
		<div className='mt-10 w-full'>
			<Title text='Рекомендовані' size='lg' className='mb-4 font-medium' />
			<div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
				{loading
					? Array.from({ length: 6 }).map((_, idx) => (
							<Skeleton key={idx} className='h-[250px] w-full rounded-xl' />
						))
					: products.map((product: any) => (
							<ProductCard
								key={product.id}
								id={product.id}
								name={product.name}
								image={product.imageUrl}
								price={product.items[0]?.price || 0}
								productItemId={product.items[0]?.id || 0}
							/>
						))}
			</div>
		</div>
	)
}
