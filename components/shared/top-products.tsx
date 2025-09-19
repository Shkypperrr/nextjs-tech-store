'use client'

import React from 'react'
import { Title } from './title'
import { getTopProducts } from '@/services/topproducts'
import { ProductCard } from './product-card'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Skeleton } from '../ui'

export const TopProducts: React.FC = () => {
	const [products, setProducts] = React.useState<any[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchData() {
			try {
				const res = await getTopProducts()
				const allProducts = res.flatMap((item: any) => item.products)
				setProducts(allProducts)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return (
		<>
			<div className='mt-10 mx-20'>
				<Title
					text='Топ товари'
					size='md'
					className='mb-7 font-bold text-2xl'
				/>
			</div>

			<div className='mb-20 px-20'>
				<Swiper
					className='h-[365px] w-full'
					modules={[Navigation, Pagination]}
					spaceBetween={20}
					slidesPerView={6}
					slidesPerGroup={2}
					navigation
					pagination={{ clickable: true }}
				>
					{loading
						? Array.from({ length: 12 }).map((_, i) => (
								<SwiperSlide key={i} className='px-10'>
									<Skeleton className='w-full h-[340px] rounded-xl' />
								</SwiperSlide>
							))
						: products.map((product: any) => (
								<SwiperSlide key={product.id} className='px-10'>
									<ProductCard
										id={product.id}
										name={product.name}
										image={product.imageUrl}
										price={product.items[0]?.price || 0}
										productItemId={product.items[0]?.id || 0}
									/>
								</SwiperSlide>
							))}
				</Swiper>
			</div>
		</>
	)
}
