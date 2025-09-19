import { useCartStore } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface ProductCardProps {
	id: number
	name: string
	image: string
	price: number
	productItemId: number
	className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
	name,
	image,
	price,
	id,
	productItemId,
}) => {
	const addCartItem = useCartStore(state => state.addCartItem)
	const onAddProduct = async () => {
		try {
			await addCartItem({
				productItemId,
			})
			toast.success('Продукт доданий до кошику')
		} catch (err) {
			toast.error('Не вдалося додати продукт до кошику')
			console.error(err)
		}
	}

	return (
		<div className='bg-white shadow-md rounded-xl p-4 max-w-[224px] w-full relative flex flex-col items-center'>
			<Link href={`/product/${id}`}>
				<div className='h-40 relative mb-3 flex items-center justify-center'>
					<Image
						src={image}
						alt={name}
						width={160}
						height={160}
						className='object-contain mx-auto block'
					/>
				</div>

				<p className='text-sm text-center font-medium mb-2'>{name}</p>

				<div className='text-center mb-2'>
					<div className='text-lg font-bold'>{price.toLocaleString()} ₴</div>
				</div>

				<p className='text-green-600 text-center text-sm mb-2 '>В наявності</p>
			</Link>

			<div className='flex justify-between items-center gap-2 m-auto'>
				<button
					onClick={onAddProduct}
					className='bg-blue-600 text-white text-sm rounded-md px-4 py-2 hover:bg-blue-700 transition cursor-pointer'
				>
					До кошику
				</button>
			</div>
		</div>
	)
}
