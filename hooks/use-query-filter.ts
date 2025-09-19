import React from 'react'
import { Filters } from './use-filters'
import qs from 'qs'
import { useRouter } from 'next/navigation'

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter()

	React.useEffect(() => {
		const params = {
			...filters.prices,
			memory: Array.from(filters.memory),
			colors: Array.from(filters.colors),
			ram: Array.from(filters.ram),
			brand: Array.from(filters.brand),
		}

		const query = qs.stringify(params, {
			arrayFormat: 'comma',
		})

		router.push(`?${query}`, {
			scroll: false,
		})

		console.log(filters, 999)
	}, [filters])
}
