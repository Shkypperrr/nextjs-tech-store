import Link from 'next/link'
import Image from 'next/image'

interface Props {
	id: number
	title: string
	image?: string
	onClick?: () => void
}

export const CategoryCard: React.FC<Props> = ({
	id,
	title,
	image,
	onClick,
}) => {
	return (
		<Link
			href={`/category/${id}`}
			className='flex flex-col items-center gap-4 w-full no-underline'
			onClick={onClick}
		>
			<div
				className='w-[200px] h-[211px] rounded-lg shadow-md bg-[#BCC5FF] flex justify-center items-center
          hover:brightness-105 transition cursor-pointer'
			>
				{image && (
					<Image
						src={image}
						alt={title}
						width={150}
						height={150}
						style={{ objectFit: 'contain' }}
						className='select-none pointer-events-none'
					/>
				)}
			</div>
			<span className='text-sm font-medium text-black'>{title}</span>
		</Link>
	)
}
