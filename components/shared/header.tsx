'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { ProfileButton } from './profile-button'
import { AuthModal } from './modals/auth-modal'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({
	hasCart = true,
	hasSearch = true,
	className,
}) => {
	const router = useRouter()

	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	const searchParams = useSearchParams()

	React.useEffect(() => {
		let toastMassage = ''

		if (searchParams.has('paid')) {
			toastMassage =
				'Замовлення успішно спачено! Вся інформація була відправлена на почту'
		}

		if (searchParams.has('verified')) {
			toastMassage = 'Пошта успішно підтверджена!'
		}

		if (toastMassage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMassage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, [])

	return (
		<header className=' border-b flex h-20 px-20 items-center'>
			<Link href='/'>
				<Image src='/logo/logo.svg' alt='Logo' width={118} height={32} />
			</Link>

			{hasSearch && (
				<div className='mx-10 flex-1'>
					<SearchInput />
				</div>
			)}

			<div className='flex items-center gap-8 ml-auto'>
				{hasCart && (
					<>
						<CartButton />
					</>
				)}

				<AuthModal
					open={openAuthModal}
					onClose={() => setOpenAuthModal(false)}
				/>
				<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
			</div>
		</header>
	)
}
