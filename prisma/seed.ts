import { Prisma } from '@prisma/client'
import { prisma } from './prisma-client'
import { hashSync } from 'bcrypt'
import { categories, colors, memories, products } from './constance'

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
	productId,
	memoryId,
	colorId,
}: {
	productId: number
	memoryId?: 1 | 2 | 3
	colorId?: 1 | 2 | 3
}) => {
	return {
		productId,
		price: randomNumber(6000, 70000),
		memoryId,
		colorId,
	} as Prisma.ProductItemUncheckedCreateInput
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User Test',
				email: 'user@gmail.com',
				password: hashSync('11111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin Admin',
				email: 'admin@gmail.com',
				password: hashSync('22222', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	})

	await prisma.category.createMany({
		data: categories,
	})

	await prisma.color.createMany({
		data: colors,
	})

	await prisma.memory.createMany({
		data: memories,
	})

	await prisma.product.createMany({
		data: products,
	})

	const telephone1 = await prisma.product.create({
		data: {
			name: 'Смартфон Apple iPhone 13',
			imageUrl: '/products/phones/apple-iphone-13.png',
			categoryId: 1,
		},
	})

	const telephone2 = await prisma.product.create({
		data: {
			name: 'Смартфон Apple iPhone 16 Pro',
			imageUrl: '/products/phones/apple-iphone-16-pro.png',
			categoryId: 1,
		},
	})

	const telephone3 = await prisma.product.create({
		data: {
			name: 'Смартфон Samsung Galaxy A05s',
			imageUrl: '/products/phones/samsung-galaxy-a05s.png',
			categoryId: 1,
		},
	})

	const telephone4 = await prisma.product.create({
		data: {
			name: 'Смартфон Samsung Galaxy S24 Ultra',
			imageUrl: '/products/phones/samsung-galaxy-s24-ultra.png',
			categoryId: 1,
		},
	})

	const telephone5 = await prisma.product.create({
		data: {
			name: 'Смартфон Xiaomi Redmi Note 13 Pro',
			imageUrl: '/products/phones/xiaomi-redmi-note-13-pro.png',
			categoryId: 1,
		},
	})

	const telephone6 = await prisma.product.create({
		data: {
			name: 'Смартфон Xiaomi 14 Pro',
			imageUrl: '/products/phones/xiaomi-14-pro.png',
			categoryId: 1,
		},
	})

	const telephone7 = await prisma.product.create({
		data: {
			name: 'Смартфон Huawei P60 Pro',
			imageUrl: '/products/phones/huawei-p60-pro.png',
			categoryId: 1,
		},
	})

	const telephone8 = await prisma.product.create({
		data: {
			name: 'Смартфон Huawei Mate 50',
			imageUrl: '/products/phones/huawei-mate-50.png',
			categoryId: 1,
		},
	})

	await prisma.productItem.createMany({
		data: [
			generateProductItem({
				productId: telephone1.id,
				memoryId: 1,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone1.id,
				memoryId: 2,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone1.id,
				memoryId: 2,
				colorId: 2,
			}),

			generateProductItem({
				productId: telephone2.id,
				memoryId: 1,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone2.id,
				memoryId: 1,
				colorId: 2,
			}),
			generateProductItem({
				productId: telephone2.id,
				memoryId: 2,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone2.id,
				memoryId: 2,
				colorId: 2,
			}),
			generateProductItem({
				productId: telephone2.id,
				memoryId: 2,
				colorId: 3,
			}),
			generateProductItem({
				productId: telephone2.id,
				memoryId: 3,
				colorId: 3,
			}),

			generateProductItem({
				productId: telephone3.id,
				memoryId: 1,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone3.id,
				memoryId: 2,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone3.id,
				memoryId: 2,
				colorId: 2,
			}),

			generateProductItem({
				productId: telephone4.id,
				memoryId: 2,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone4.id,
				memoryId: 3,
				colorId: 2,
			}),
			generateProductItem({
				productId: telephone4.id,
				memoryId: 3,
				colorId: 3,
			}),

			generateProductItem({
				productId: telephone5.id,
				memoryId: 1,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone5.id,
				memoryId: 2,
				colorId: 2,
			}),

			generateProductItem({
				productId: telephone6.id,
				memoryId: 2,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone6.id,
				memoryId: 3,
				colorId: 3,
			}),

			generateProductItem({
				productId: telephone7.id,
				memoryId: 2,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone7.id,
				memoryId: 2,
				colorId: 2,
			}),
			generateProductItem({
				productId: telephone7.id,
				memoryId: 3,
				colorId: 3,
			}),

			generateProductItem({
				productId: telephone8.id,
				memoryId: 1,
				colorId: 1,
			}),
			generateProductItem({
				productId: telephone8.id,
				memoryId: 2,
				colorId: 2,
			}),

			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
			generateProductItem({ productId: 11 }),
			generateProductItem({ productId: 12 }),
			generateProductItem({ productId: 13 }),
			generateProductItem({ productId: 14 }),
			generateProductItem({ productId: 15 }),
			generateProductItem({ productId: 16 }),
			generateProductItem({ productId: 17 }),
			generateProductItem({ productId: 18 }),
			generateProductItem({ productId: 19 }),
			generateProductItem({ productId: 20 }),
			generateProductItem({ productId: 21 }),
			generateProductItem({ productId: 22 }),
			generateProductItem({ productId: 23 }),
			generateProductItem({ productId: 24 }),
			generateProductItem({ productId: 25 }),
			generateProductItem({ productId: 26 }),
			generateProductItem({ productId: 27 }),
			generateProductItem({ productId: 28 }),
			generateProductItem({ productId: 29 }),
			generateProductItem({ productId: 30 }),
			generateProductItem({ productId: 31 }),
			generateProductItem({ productId: 32 }),
			generateProductItem({ productId: 33 }),
			generateProductItem({ productId: 34 }),
			generateProductItem({ productId: 35 }),
			generateProductItem({ productId: 36 }),
			generateProductItem({ productId: 37 }),
			generateProductItem({ productId: 38 }),
			generateProductItem({ productId: 39 }),
			generateProductItem({ productId: 40 }),
		],
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '11111',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '22222',
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
		},
	})

	await prisma.story.createMany({
		data: [
			{
				previewImageUrl:
					'https://images.pexels.com/photos/892757/pexels-photo-892757.jpeg',
			},
			{
				previewImageUrl:
					'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
			},
			{
				previewImageUrl:
					'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
			},
			{
				previewImageUrl:
					'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg',
			},
			{
				previewImageUrl:
					'https://images.pexels.com/photos/3945682/pexels-photo-3945682.jpeg',
			},
			{
				previewImageUrl:
					'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
			},
		],
	})

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl:
					'https://images.pexels.com/photos/1308784/pexels-photo-1308784.jpeg',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://images.pexels.com/photos/5082582/pexels-photo-5082582.jpeg',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://images.pexels.com/photos/4429506/pexels-photo-4429506.jpeg',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
			},
		],
	})
}

async function down() {
	const tables = [
		'User',
		'Category',
		'Cart',
		'CartItem',
		'Product',
		'ProductItem',
		'Color',
		'Memory',
		'Story',
		'StoryItem',
	]

	for (const table of tables) {
		await prisma.$executeRawUnsafe(
			`DO $$
       BEGIN
         IF EXISTS (SELECT FROM pg_tables WHERE tablename = '${table}') THEN
           EXECUTE 'TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE';
         END IF;
       END$$;`
		)
	}
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.log(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
