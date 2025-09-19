import { ProductItem } from '@prisma/client'
import { Variant } from '../components/shared/group-variants'
import { telephoneColors, TelMemory } from '@/constans/telephone'

export const getAvailableTelephoneColors = (
	memory: TelMemory,
	items: ProductItem[]
): Variant[] => {
	const filteredTelephoneByMemory = items.filter(
		item => item.memoryId === memory
	)

	return telephoneColors.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredTelephoneByMemory.some(
			telephone => Number(telephone.colorId) === Number(item.value)
		),
	}))
}
