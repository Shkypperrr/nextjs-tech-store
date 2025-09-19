import React from 'react'
import { Variant } from '../components/shared/group-variants'
import { getAvailableTelephoneColors } from '../lib'
import { ProductItem } from '@prisma/client'
import { TelColor, TelMemory } from '@/constans/telephone'

interface ReturnProps {
	color: TelColor
	memory: TelMemory
	availableColors: Variant[]
	currentItemId?: number
	setColor: (color: TelColor) => void
	setMemory: (color: TelMemory) => void
}

export const useTelephoneOptions = (items: ProductItem[]): ReturnProps => {
	const [color, setColor] = React.useState<TelColor>(1)
	const [memory, setMemory] = React.useState<TelMemory>(1)

	const availableColors = getAvailableTelephoneColors(memory, items)

	const currentItemId = items.find(
		item => item.memoryId === memory && item.colorId === color
	)?.id

	React.useEffect(() => {
		const isAvailableColor = availableColors?.find(
			item => Number(item.value) === color && !item.disabled
		)
		const firstAvailable = availableColors?.find(item => !item.disabled)

		if (!isAvailableColor && firstAvailable) {
			setColor(Number(firstAvailable.value) as TelColor)
		}
	}, [memory, availableColors])

	return {
		color,
		memory,
		availableColors,
		currentItemId,
		setColor,
		setMemory,
	}
}
