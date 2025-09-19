import { cn } from '@/lib/utils'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import * as CartItem from './cart-item-details'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void
	onClickRemove?: () => void
	className?: string
}

export const CartDrawerItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	disabled,
	onClickCountButton,
	onClickRemove,
	className,
}) => {
	return (
		<div
			className={cn(
				'grid grid-cols-[72px_1fr] gap-4 px-4 py-6 border-b border-[#BCC5FF]',
				{ 'opacity-50 pointer-events-none': disabled },
				className
			)}
		>
			<CartItem.Image src={imageUrl} className='w-18 h-18' />

			<div className='flex flex-col justify-between min-w-0'>
				<CartItem.Info
					name={name}
					className='text-sm font-medium break-words'
				/>

				<CartItem.Price
					value={price}
					className='mt-3 text-base font-bold text-black'
				/>

				<div className='flex items-center justify-between mt-3 '>
					<button className='p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors'>
						<Trash2Icon
							onClick={onClickRemove}
							size={16}
							className='text-gray-500'
						/>
					</button>

					<CountButton onClick={onClickCountButton} value={quantity} />
				</div>
			</div>
		</div>
	)
}
