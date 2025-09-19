import { TopProducts } from '@/components/shared'
import { CatalogCategories } from '@/components/shared/catalog-categories'
import { PromoCarousel } from '@/components/shared/promo-carusel'
import { PromoSection } from '@/components/shared/promo-section'

export default function Home() {
	return (
		<main>
			<PromoCarousel />
			<CatalogCategories />
			<TopProducts />
		</main>
	)
}
