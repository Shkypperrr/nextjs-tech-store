export async function getTopProducts() {
	const res = await fetch('/api/top-products')
	if (!res.ok) throw new Error('Failed to fetch top products')
	return res.json()
}
