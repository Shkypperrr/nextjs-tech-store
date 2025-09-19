import { Category } from '@prisma/client'
import React from 'react'

interface Props {
	items: Category[]
	className?: string
}

const cats = [
	'Смартфони',
	'Ноутбуки',
	`Комп'ютери`,
	'Телевізори',
	'Планшети',
	'Навушники',
]

export const Categories: React.FC<Props> = ({ className, items }) => {
	return (
		<section className='mt-10 px-20 '>
			<h2 className='text-2xl font-bold mb-7'>Каталог</h2>
			{items.map(({ name, id }, index) => (
				<div className="'flex gap-6'"></div>
			))}
		</section>
	)
}
