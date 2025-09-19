'use client'

import { Loader2, ShoppingCart } from 'lucide-react'
import { CartDrawer } from './cart-drawer'
import { useCartStore } from '@/store'

interface Props {
	className?: string
}

export const CartButton: React.FC<Props> = ({}) => {
	const items = useCartStore(state => state.items)
	const loading = useCartStore(state => state.loading)
	return (
		<CartDrawer>
			<button className='relative flex flex-col items-center h-11 w-13 cursor-pointer top-[-3px]'>
				<div className='relative'>
					{loading ? (
						<Loader2 className='h-7 w-7 animate-spin text-gray-500' />
					) : (
						<>
							<ShoppingCart className='h-7 w-7' />

							{items.length > 0 && (
								<span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
									{items.length}
								</span>
							)}
						</>
					)}
				</div>
				<span className='text-[#454545] text-sm'>Кошик</span>
			</button>
		</CartDrawer>
	)
}
