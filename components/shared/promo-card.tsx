import Image from 'next/image'

interface PromoCardProps {
	title: string
	image: string
	discount: number
	price: number
	oldPrice: number
	isAvailable: boolean
}

export const PromoCard: React.FC<PromoCardProps> = ({
	title,
	image,
	discount,
	price,
	oldPrice,
	isAvailable,
}) => {
	return (
		<div className='bg-white shadow-md rounded-xl p-4 w-56 relative flex flex-col items-center'>
			<div className='absolute top-2 left-2 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded'>
				-{discount} %
			</div>

			<div className='w-40 h-40 relative mb-3'>
				<Image src={image} alt={title} layout='fill' objectFit='contain' />
			</div>

			<p className='text-sm text-center font-medium mb-2'>{title}</p>

			<div className='text-center mb-2'>
				<div className='text-lg font-bold'>{price.toLocaleString()} ₴</div>
				<div className='text-sm line-through text-gray-400'>
					{oldPrice.toLocaleString()} ₽
				</div>
			</div>

			<p className='text-green-600 text-sm mb-2'>
				{isAvailable ? 'В наявності' : 'Нема в наявності'}
			</p>

			<div className='flex justify-between  items-center gap-2 m-auto'>
				<button className='bg-blue-600 text-white text-sm rounded-md px-4 py-2 hover:bg-blue-700 transition'>
					До кошику
				</button>
			</div>
		</div>
	)
}
