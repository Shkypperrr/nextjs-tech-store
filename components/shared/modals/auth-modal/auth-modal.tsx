import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { signIn } from 'next-auth/react'
import React from 'react'
import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'register'>('login')

	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login')
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='w-[400px] bg-white p-8 rounded-2xl shadow-lg'>
				{type === 'login' ? (
					<LoginForm onClose={handleClose} />
				) : (
					<RegisterForm onClose={handleClose} />
				)}

				<div className='flex flex-col gap-3'>
					<button
						onClick={() =>
							signIn('google', { callbackUrl: '/', redirect: true })
						}
						type='button'
						className='flex items-center justify-center gap-3 border rounded-lg py-2.5 hover:bg-gray-50 transition cursor-pointer'
					>
						<img
							className='w-6 h-6'
							src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
							alt='Google'
						/>
						<span className='text-sm font-medium'>Увійти через Google</span>
					</button>

					<button
						onClick={() =>
							signIn('github', { callbackUrl: '/', redirect: true })
						}
						type='button'
						className='flex items-center justify-center gap-3 border rounded-lg py-2.5 hover:bg-gray-50 transition cursor-pointer'
					>
						<img
							className='w-6 h-6'
							src='https://github.githubassets.com/favicons/favicon.svg'
							alt='GitHub'
						/>
						<span className='text-sm font-medium'>Увійти через GitHub</span>
					</button>
				</div>
				<Button
					variant='outline'
					onClick={onSwitchType}
					type='button'
					className='h-12'
				>
					{type !== 'login' ? 'Увійти' : 'Реєстрація'}
				</Button>
			</DialogContent>
		</Dialog>
	)
}
