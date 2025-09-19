import { CircleUser, User } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Props {
	onClickSignIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn }) => {
	const { data: session } = useSession()

	return (
		<div>
			{!session ? (
				<button
					onClick={onClickSignIn}
					className='flex flex-col items-center h-11 w-13 cursor-pointer'
				>
					<User className='h-7 w-7' />
					<span className='text-[#454545] text-sm '>Увійти</span>
				</button>
			) : (
				<Link href='/profile'>
					<button className='flex flex-col items-center h-11 w-13 cursor-pointer'>
						<CircleUser size={50} />
						<span className='text-[#454545] text-sm '>Профіль</span>
					</button>
				</Link>
			)}
		</div>
	)
}
