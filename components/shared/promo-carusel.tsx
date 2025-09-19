'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export const PromoCarousel = () => {
	return (
		<div className='mt-10 px-20 '>
			<Swiper
				modules={[Navigation]}
				navigation
				loop={true}
				className='w-full rounded-lg'
			>
				<SwiperSlide>
					<div className='bg-black text-center py-4 text-white font-semibold h-[200px] '>
						Гарантія на любий девайс — до 1 року!
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='bg-black text-center py-4 text-white font-semibold h-[200px] '>
						Ми відповідаємо за якість — ви користуєтесь без турбот
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='bg-black text-center py-4 text-white font-semibold h-[200px]'>
						Легке повернення протягом 14 днів
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	)
}
