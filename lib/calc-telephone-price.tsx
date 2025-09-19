import { ProductItem } from '@prisma/client'

import { TelColor, TelMemory } from '@/constans/telephone'

/**
 * Функция для подсчета стоимости телефона
 *
 * @param memory - тип памяти выбранного телефона
 * @param color - цвет выбранного телефона
 * @param items - список вариаций
 *
 * @returns number  стоимость
 */
export const calcTelephonePrice = (
	memory: TelMemory,
	color: TelColor,
	items: ProductItem[]
) => {
	const telephonePrice =
		items.find(item => item.memoryId === memory && item.colorId === color)
			?.price || 0

	return telephonePrice
}
