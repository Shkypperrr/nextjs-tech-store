'use client'

import clsx from 'clsx'
import React from 'react'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface Props {
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	value?: Variant['value']
	className?: string
}

export const GroupVariants: React.FC<Props> = ({
	className,
	items,
	onClick,
	value,
}) => {
	return (
		<div
			className={clsx(
				'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
				className
			)}
		>
			{items.map(item => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					disabled={item.disabled}
					className={clsx(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
