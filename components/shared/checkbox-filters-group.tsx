'use client'

import React from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

type Item = FilterCheckboxProps

interface Props {
	title: string
	items: Item[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	onClickCheckbox?: (id: string) => void
	defaultValue?: string[]
	selected?: Set<string>
	name?: string
	className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	limit = 3,
	selected,
	onClickCheckbox,
	name,
	className,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const list = showAll ? items : items.slice(0, limit)

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selected?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='mt-3 cursor-pointer text-[#750DC5]'
					>
						{showAll ? 'Скрити' : '+ Показати більше'}
					</button>
				</div>
			)}
		</div>
	)
}
