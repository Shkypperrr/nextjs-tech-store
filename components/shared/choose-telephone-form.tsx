'use client'

import React from 'react'
import { ProductItem } from '@prisma/client'
import { Title } from './title'
import { GroupVariants } from './group-variants'
import { ProductImage } from './product-image'
import { TelColor, telephoneMemory, TelMemory } from '@/constans/telephone'
import { cn } from '@/lib/utils'
import { useTelephoneOptions } from '@/hooks/use-telephone-options'
import { getTelephoneDetails } from '@/lib'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { RecommendedProducts } from './recommended-products'

interface Props {
	imageUrl: string
	name: string
	items: ProductItem[]
	loading?: boolean
	onSubmit: (itemId: number, ingredients: number[]) => void
	className?: string
}

export const ChooseTelephoneForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	loading,
	onSubmit,
	className,
}) => {
	const { color, memory, availableColors, currentItemId, setColor, setMemory } =
		useTelephoneOptions(items)

	const { totalPrice, textDetails } = getTelephoneDetails(color, memory, items)

	return (
		<>
			<div className={cn(className, 'flex flex-col flex-1 px-40')}>
				<div className='flex items-center gap-0 mb-6'>
					<Link href='/category/1'>
						<button className='hover:text-gray-500 transition-colors cursor-pointer relative top-[4px]'>
							<ChevronLeft className='w-13 h-15' />
						</button>
					</Link>
					<Title text='Карточка товару' size='lg' className='font-medium' />
				</div>

				<div className='flex gap-10'>
					<ProductImage imageUrl={imageUrl} />

					<div className='w-[490px] bg-gray-50 p-7'>
						<Title text={name} size='md' className='font-extrabold mb-1' />

						<p className='text-gray-400'>{textDetails}</p>

						<div className='flex flex-col gap-4 mt-5'>
							<GroupVariants
								items={availableColors}
								value={String(color)}
								onClick={value => setColor(Number(value) as TelColor)}
							/>

							<GroupVariants
								items={telephoneMemory}
								value={String(memory)}
								onClick={value => setMemory(Number(value) as TelMemory)}
							/>
						</div>

						<div className='bg-white rounded-xl p-5 mt-6 shadow-sm'>
							<h3 className='text-lg font-semibold mb-3'>Характеристики:</h3>
							<ul className='space-y-2 text-sm text-gray-700'>
								<li className='flex justify-between border-b pb-1'>
									<span>Екран:</span>
									<span>6.1" / 2532×1170</span>
								</li>
								<li className='flex justify-between border-b pb-1'>
									<span>Кількість ядер:</span>
									<span>6</span>
								</li>
								<li className='flex justify-between border-b pb-1'>
									<span>Потужність блоку живлення:</span>
									<span>20 Вт</span>
								</li>
								<li className='flex justify-between border-b pb-1'>
									<span>Оперативна пам’ять (RAM):</span>
									<span>6 ГБ</span>
								</li>
								<li className='flex justify-between border-b pb-1'>
									<span>Вбудована пам’ять (ROM):</span>
									<span>128 ГБ</span>
								</li>
								<li className='flex justify-between'>
									<span>Основна камера:</span>
									<span>64 / 2 МП</span>
								</li>
							</ul>
						</div>

						<div className='flex justify-between items-center gap-2 m-auto mt-5'>
							<button
								disabled={loading}
								onClick={() => currentItemId && onSubmit(currentItemId, [])}
								className='bg-blue-600 text-white text-sm rounded-md px-4 py-2 hover:bg-blue-700 transition cursor-pointer'
							>
								Додати до кошику за {totalPrice} ₽
							</button>
						</div>
					</div>
				</div>
			</div>

			{items?.[0]?.productId && (
				<RecommendedProducts productId={items[0].productId} />
			)}
		</>
	)
}
