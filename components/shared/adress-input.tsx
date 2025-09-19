'use client'
import React from 'react'
import {
	GeoapifyContext,
	GeoapifyGeocoderAutocomplete,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

interface Props {
	handleSelect?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ handleSelect }) => {
	return (
		<div className='w-[400px]'>
			<GeoapifyContext apiKey='42b1baecc8c34ac4a59da5d614c10381'>
				<GeoapifyGeocoderAutocomplete
					placeholder='Виберіть місто'
					type='city'
					lang='uk'
					filterByCountryCode={['ua']}
					placeSelect={data => handleSelect?.(data?.properties?.city)}
				/>
			</GeoapifyContext>
		</div>
	)
}
