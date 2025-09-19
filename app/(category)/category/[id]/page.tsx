import { Filters } from '@/components/shared/filters'
import { ProductCategoryList } from '@/components/shared/products-category-list'
import { Title } from '@/components/shared/title'
import { findTelephone, GetSearchParams } from '@/lib/find-telephone'
import { ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function CategoryPage({
	params: paramsPromise,
	searchParams: searchParamsPromise,
}: {
	params: Promise<{ id: string }>
	searchParams: Promise<GetSearchParams>
}) {
	const params = await paramsPromise
	const searchParams = await searchParamsPromise
	const category = await findTelephone(Number(params.id), searchParams)

	if (!category) {
		return <p>Категория не найдена</p>
	}

	return (
		<>
			<div className='max-w-[1550px] mx-auto mt-10'>
				<div className='flex items-center gap-0 '>
					<Link href='/'>
						<button className='hover:text-gray-500 transition-colors cursor-pointer relative top-[4px]'>
							<ChevronLeft className='w-13 h-15 ' />
						</button>
					</Link>
					<Title text={category.name} size='lg' className='font-medium' />
				</div>
			</div>

			<div className='max-w-[1500px] mx-auto '>
				<div className='flex items-center gap-1 transition-colors pt-8 pb-0 mb-0'>
					<div className='flex flex-col leading-none'>
						<ChevronUp className='w-3 h-3 -mb-[2px]' />
						<ChevronDown className='w-3 h-3 -mt-[2px]' />
					</div>
					<span className='text-sm font-medium'>За популярністю</span>
				</div>

				<div className='pb-14'>
					<div className='flex gap-[60px]'>
						<div className='w-[250px]'>
							<Suspense>
								<Filters />
							</Suspense>
						</div>

						<div className='flex-1 '>
							<div className='flex flex-col gap-16'>
								{category.products.length > 0 && (
									<ProductCategoryList
										key={category.id}
										categoryId={category.id}
										items={category.products}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
