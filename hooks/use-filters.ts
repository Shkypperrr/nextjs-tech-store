import { Filters } from '@/components/shared'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useSet } from 'react-use'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	colors: string
	memory: string
	ram: string
	brand: string
}

export interface Filters {
	memory: Set<string>
	colors: Set<string>
	ram: Set<string>
	brand: Set<string>
	prices: PriceProps
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void
	setMemory: (value: string) => void
	setColors: (value: string) => void
	setRam: (value: string) => void
	setBrand: (value: string) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	const getArrayFromParam = (param: string | undefined) =>
		param ? param.split(',') : []

	const [memory, { toggle: toggleMemory }] = useSet(
		new Set<string>(getArrayFromParam(searchParams.get('memory')))
	)

	const [colors, { toggle: toggleColors }] = useSet(
		new Set<string>(getArrayFromParam(searchParams.get('colors')))
	)

	const [ram, { toggle: toggleRam }] = useSet(
		new Set<string>(getArrayFromParam(searchParams.get('ram')))
	)

	const [brand, { toggle: toggleBrand }] = useSet(
		new Set<string>(getArrayFromParam(searchParams.get('brand')))
	)

	const getNum = (v: string | null | undefined) =>
		v == null || v === '' ? undefined : Number(v)

	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: getNum(searchParams.get('priceFrom')),
		priceTo: getNum(searchParams.get('priceTo')),
	})

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value,
		}))
	}

	return React.useMemo(
		() => ({
			memory,
			colors,
			ram,
			brand,
			prices,
			setPrices: updatePrice,
			setMemory: toggleMemory,
			setColors: toggleColors,
			setRam: toggleRam,
			setBrand: toggleBrand,
		}),
		[memory, colors, ram, brand, prices]
	)
}
