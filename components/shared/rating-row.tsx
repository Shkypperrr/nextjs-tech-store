import React from 'react'
import { Star, StarOff } from 'lucide-react'

interface RatingRowProps {
	label: string
	value: number
}

export const RatingRow: React.FC<RatingRowProps> = ({ label, value }) => {
	return (
		<div className='flex items-center justify-between text-sm text-gray-700'>
			<span>{label}</span>
			<div className='flex'>
				{[...Array(5)].map((_, i) =>
					i < value ? (
						<Star
							key={i}
							size={16}
							className='text-yellow-500 fill-yellow-500'
						/>
					) : (
						<StarOff key={i} size={16} className='text-gray-300' />
					)
				)}
			</div>
		</div>
	)
}
