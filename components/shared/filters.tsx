'use client'

import React from 'react'
import { Input } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { useQueryFilters, useFilters } from '@/hooks'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const filters = useFilters()
	useQueryFilters(filters)

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={className}>
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Ціна від і до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={100000}
						value={filters.prices.priceFrom?.toString() ?? ''}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						min={300}
						max={100000}
						placeholder='10000'
						value={String(filters.prices.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={100000}
					step={300}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 100000,
					]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFiltersGroup
				className='mt-5'
				title="Вбудована пам'ять"
				name='memory'
				selected={filters.memory}
				onClickCheckbox={filters.setMemory}
				limit={3}
				items={[
					{ text: '128 ГБ', value: '1' },
					{ text: '256 ГБ', value: '2' },
					{ text: '512 ГБ', value: '3' },
				]}
			/>

			<CheckboxFiltersGroup
				className='mt-5'
				title='Колір'
				name='color'
				selected={filters.colors}
				onClickCheckbox={filters.setColors}
				items={[
					{ text: 'Чорний', value: '1' },
					{ text: 'Білий', value: '2' },
					{ text: 'Синій', value: '3' },
				]}
			/>

			<CheckboxFiltersGroup
				className='mt-5'
				title="Оперативна пам'ять"
				selected={filters.ram}
				onClickCheckbox={filters.setRam}
				limit={3}
				items={[
					{
						text: '4',
						value: '1',
					},
					{
						text: '8',
						value: '2,',
					},
					{
						text: '12',
						value: '3',
					},

					{
						text: '16',
						value: '4',
					},
					{
						text: '32',
						value: '5',
					},
					{
						text: '64',
						value: '6',
					},
				]}
			/>

			<CheckboxFiltersGroup
				className='mt-5'
				title='Бренд'
				selected={filters.brand}
				onClickCheckbox={filters.setBrand}
				limit={3}
				items={[
					{ text: 'Apple', value: 'apple' },
					{ text: 'Samsung', value: 'samsung' },
					{ text: 'Xiaomi', value: 'xiaomi' },
					{ text: 'Huawei', value: 'huawei' },
					{ text: 'OnePlus', value: 'oneplus' },
				]}
			/>
		</div>
	)
}
