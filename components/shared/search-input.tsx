'use client'

import { Search } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { Api } from '@/services/api-client'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [focused, setFocused] = useState(false)
	const [products, setProducts] = useState<Product[]>([])
	const ref = React.useRef(null)

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery)
				setProducts(response)
			} catch (error) {
				console.log(error)
			}
		},
		250,
		[searchQuery]
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />
			)}
			<div
				ref={ref}
				className='flex rounded-2xl flex-1 justify-between relative h-11 z-30'
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					className='rounded-2xl outline-none w-full bg-gray-200 pl-11'
					type='text'
					placeholder='Пошук товару...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				{products.length > 0 && (
					<div
						className={`absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 z-30 ${
							focused ? 'visible opacity-100 top-12' : 'invisible opacity-0'
						}`}
					>
						{products.map(product => (
							<Link
								onClick={onClickItem}
								key={product.id}
								href={`/product/${product.id}`}
							>
								<div className='px-3 py-2 hover:bg-slate-100 cursor-pointer rounded-lg'>
									<span>{product.name}</span>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}
