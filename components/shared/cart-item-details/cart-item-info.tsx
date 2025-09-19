import { cn } from '@/lib/utils'

interface Props {
	name: string
	className?: string
}

export const CartItemInfo: React.FC<Props> = ({ name, className }) => {
	return (
		<div>
			<div className={cn('flex items-center justify-between', className)}>
				<h2 className='text-lg font-bold flex-1 leading-6'>{name}</h2>
			</div>
		</div>
	)
}
