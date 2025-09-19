'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store'
import { ProductWithRelations } from '@/@types/prisma'
import { ChooseProductForm } from './choose-product-form'
import { ChooseTelephoneForm } from './choose-telephone-form'

interface Props {
	product: ProductWithRelations
}

export const ProductForm: React.FC<Props> = ({ product }) => {
	const addCartItem = useCartStore(state => state.addCartItem)
	const loading = useCartStore(state => state.loading)

	const firstItem = product.items[0]
	const isTelephoneForm = Boolean(firstItem.colorId)

	const onSubmit = async (productItemId?: number) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
			})

			toast.success(product.name + ' доданий до кошику')
		} catch (err) {
			toast.error('Не вдалося додати товар до кошику')
			console.error(err)
		}
	}

	if (isTelephoneForm) {
		return (
			<ChooseTelephoneForm
				imageUrl={product.imageUrl}
				name={product.name}
				items={product.items}
				onSubmit={onSubmit}
				loading={loading}
			/>
		)
	}

	return (
		<ChooseProductForm
			productId={product.id}
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={loading}
		/>
	)
}
