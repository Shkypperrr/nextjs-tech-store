import Image from 'next/image'

interface Props {
	className?: string
	imageUrl: string
	alt?: string
}

export const ProductImage: React.FC<Props> = ({ imageUrl, className, alt }) => {
	return (
		<div className={className}>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={alt || 'Зображення товару'}
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
		</div>
	)
}
