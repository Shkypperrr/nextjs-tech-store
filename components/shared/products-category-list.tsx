'use client'

import { ProductCard } from './product-card'

interface Props {
	title?: string
	categoryId: number
	items: any[]
}

export const ProductCategoryList: React.FC<Props> = ({ items, title }) => {
	return (
		<div>
			<h1 className='text-2xl font-bold mb-4' id={title}>
				{title}
			</h1>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center py-6 '>
				{items.map((product, i) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						image={product.imageUrl}
						price={product.items[0].price}
						productItemId={product.items[0].id}
					/>
				))}
			</div>
		</div>
	)
}
