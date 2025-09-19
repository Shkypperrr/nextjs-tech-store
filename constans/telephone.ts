export const mapTelColor = {
	1: 'Білий',
	2: 'Чорний',
	3: 'Синій',
} as const

export const mapTelMemory = {
	1: '128',
	2: '256',
	3: '512',
} as const

export const telephoneColors = Object.entries(mapTelColor).map(
	([key, value]) => ({
		name: value,
		value: key,
	})
)
export const telephoneMemory = Object.entries(mapTelMemory).map(
	([key, value]) => ({
		name: value + ' ГБ',
		value: key,
	})
)

export type TelColor = keyof typeof mapTelColor
export type TelMemory = keyof typeof mapTelMemory
