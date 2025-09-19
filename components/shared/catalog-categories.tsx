import { CategoryCard } from './category-card'
import { Title } from './title'

export const CatalogCategories = () => {
	const categories = [
		{ id: 1, title: 'Смартфони', image: '/catalog/telcatalog.png' },
		{ id: 2, title: 'Ноутбуки', image: '/catalog/lapcatalog.png' },
		{ id: 3, title: `Комп'ютери`, image: '/catalog/compcatalog.png' },
		{ id: 4, title: 'Телевізори', image: '/catalog/tvcatalog.png' },
		{ id: 5, title: 'Планшети', image: '/catalog/tabcatalog.png' },
		{ id: 6, title: 'Навушники', image: '/catalog/earcatalog.png' },
	]

	return (
		<section className='mt-10 px-20 '>
			<Title text='Каталог' size='md' className='mb-7 font-bold text-2xl' />
			<div className='flex gap-6'>
				{categories.map(cat => (
					<CategoryCard
						key={cat.id}
						title={cat.title}
						image={cat.image}
						id={cat.id}
					/>
				))}
			</div>
		</section>
	)
}
