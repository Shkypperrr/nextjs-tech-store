'use client'

import React from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { RatingRow } from './rating-row'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { RecommendedProducts } from './recommended-products'
import { useRouter } from 'next/navigation'

interface Props {
	productId: number
	imageUrl: string
	name: string
	price: number
	loading?: boolean
	onSubmit?: VoidFunction
	className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
	name,
	productId,
	imageUrl,
	price,
	onSubmit,
	className,
	loading,
}) => {
	const characteristics = [
		{ label: 'Надійність', value: 4 },
		{ label: 'Якість матеріалів', value: 5 },
		{ label: 'Ергономіка', value: 4 },
		{ label: 'Популярність', value: 5 },
		{ label: 'Інноваційність', value: 4 },
		{ label: 'Ціна / Якість', value: 5 },
	]

	const router = useRouter()

	return (
		<>
			<div className={cn(className, 'flex flex-col flex-1 px-40')}>
				<div className='flex items-center gap-0 mb-6'>
					<button
						onClick={() => router.back()}
						className='hover:text-gray-500 transition-colors cursor-pointer relative top-[4px]'
					>
						<ChevronLeft className='w-13 h-15' />
					</button>

					<Title text='Карточка товару' size='lg' className='font-medium' />
				</div>

				<div className='flex gap-15'>
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt={name}
							width={400}
							height={400}
							className='max-w-full h-auto object-contain transition-transform duration-300 hover:scale-105'
							priority={false}
						/>
					) : (
						<div className='w-[400px] h-[400px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm'>
							Немає зображення
						</div>
					)}

					<div className='w-[490px] bg-gray-50 p-7'>
						<Title text={name} size='md' className='font-extrabold mb-1' />

						<div className='bg-white rounded-xl p-5 mt-6 shadow-sm'>
							<h3 className='text-lg font-semibold mb-3'>Характеристики:</h3>
							<div className='space-y-3'>
								{characteristics.map((item, idx) => (
									<RatingRow key={idx} label={item.label} value={item.value} />
								))}
							</div>
						</div>

						<div className='flex justify-between items-center gap-2 m-auto mt-5'>
							<button
								disabled={loading}
								onClick={() => onSubmit?.()}
								className='bg-blue-600 text-white text-sm rounded-md px-4 py-2 hover:bg-blue-700 transition cursor-pointer'
							>
								Додати до кошику за {price} ₽
							</button>
						</div>
					</div>
				</div>
			</div>

			<RecommendedProducts productId={productId} />
		</>
	)
}
