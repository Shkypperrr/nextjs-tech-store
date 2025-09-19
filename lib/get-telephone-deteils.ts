import { ProductItem } from '@prisma/client'
import {
	mapTelColor,
	mapTelMemory,
	TelColor,
	TelMemory,
} from '@/constans/telephone'

export const getTelephoneDetails = (
	memory: TelMemory,
	color: TelColor,
	items: ProductItem[]
) => {
	const totalPrice = items[0]?.price || 0
	const textDetails = `колір ${mapTelColor[color]}, вбудована пам'ять ${mapTelMemory[memory]} ГБ`

	return { totalPrice, textDetails }
}
