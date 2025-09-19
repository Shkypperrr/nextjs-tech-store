'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { PromoCard } from './promo-card'

export const PromoSection = () => {
	const promos = [
		{
			title: 'Смартфон Apple iPhone 13 128GB',
			image: '/promo/iphone13.png',
			discount: 5,
			price: 22799,
			oldPrice: 23999,
			isAvailable: true,
		},
		{
			title: 'Смартфон Apple iPhone 16 Pro 256GB',
			image: '/promo/iphone16.png',
			discount: 10,
			price: 51029,
			oldPrice: 56699,
			isAvailable: true,
		},
		{
			title: 'Смартфон Samsung Galaxy A05s 128GB',
			image: '/promo/samsung.png',
			discount: 8,
			price: 7599,
			oldPrice: 8199,
			isAvailable: true,
		},
		{
			title: 'Смартфон Xiaomi Redmi 14C 128GB',
			image: '/promo/xiaomi.png',
			discount: 25,
			price: 5999,
			oldPrice: 7899,
			isAvailable: true,
		},
		{
			title: 'Смартфон Huawei P30 Lite 128GB',
			image: '/promo/huawei.png',
			discount: 12,
			price: 5789,
			oldPrice: 6579,
			isAvailable: true,
		},
	]

	return (
		<section className='mt-10 px-20'>
			<h2 className='text-2xl font-bold mb-7'>Акція</h2>

			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={4}
				navigation
				pagination={{ clickable: true }}
			>
				{promos.map((promo, idx) => (
					<SwiperSlide key={idx}>
						<PromoCard {...promo} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}
