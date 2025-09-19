'use client'
import Link from 'next/link'
import Image from 'next/image'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import React from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const {
		addCartItem,
		items,
		loading,
		removeCartItem,
		totalAmount,
		updateItemQuantity,
	} = useCart()
	const [redirecting, setRedirecting] = React.useState(false)

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#ffffff]'>
				<div
					className={cn(
						'flex flex-col h-full',
						!totalAmount && 'justify-center'
					)}
				>
					<SheetHeader>
						<SheetTitle>
							{totalAmount > 0 ? (
								<>
									В кошику{' '}
									<span className='font-bold'>{items.length} товара</span>
								</>
							) : (
								<VisuallyHidden>Кошик</VisuallyHidden>
							)}
						</SheetTitle>
					</SheetHeader>

					{!totalAmount && (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image
								src='/assets/images/basket.png'
								alt='Empty cart'
								width={300}
								height={300}
							/>
							<Title
								text='Кошик порожній'
								className='text-center font-bold my-2 text-base'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Додайте хоча б один продукт, щоб зробити замовлення
							</p>

							<SheetClose asChild>
								<button
									type='submit'
									className='w-56 h-12 text-base text-white bg-blue-600 hover:bg-blue-700 transition-colors inline-flex items-center justify-center cursor-pointer rounded-md'
								>
									<ArrowLeft className='w-5 mr-2' />
									Повернутися назад
								</button>
							</SheetClose>
						</div>
					)}

					{totalAmount > 0 && (
						<>
							<div className=' mt-5 overflow-auto flex-1'>
								{items.map(item => (
									<CartDrawerItem
										key={item.id}
										id={item.id}
										imageUrl={item.imageUrl}
										disabled={item.disabled}
										name={item.name}
										price={item.price}
										quantity={item.quantity}
										onClickCountButton={type =>
											onClickCountButton(item.id, item.quantity, type)
										}
										onClickRemove={() => removeCartItem(item.id)}
									/>
								))}
							</div>

							<SheetFooter className='bg-white p-8'>
								<div className='w-full'>
									<div className='flex mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Разом
											<div className='flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>{totalAmount} ₴</span>
									</div>

									<Link href='/checkout'>
										<button
											onClick={() => setRedirecting(false)}
											disabled={redirecting}
											type='submit'
											className='w-full h-12 bg-[#BCC5FF] hover:bg-[#C7CEFF] transition-colors inline-flex items-center justify-center cursor-pointer rounded-md'
										>
											Оформити замовлення
											<ArrowRight className='w-5 ml-2' />
										</button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
