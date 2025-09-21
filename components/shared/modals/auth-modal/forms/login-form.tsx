import { formLoginSchema, TFormLoginValues } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '@/components/shared/title'
import { FormInput } from '@/components/shared/form/from-input'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success('Ви успішно увійшли до облікового запису', {
				icon: '✅',
			})

			onClose?.()
		} catch (error) {
			console.error('Error [LOGIN]', error)
			toast.error('Не вдалося увійти в аккаунт', {
				icon: '❌',
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title
							text='Вхід до облікового запису'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>
							Введіть свою пошту, щоб увійти до свого облікового запису
						</p>
					</div>
					<img
						src='/assets/images/register.png'
						alt='register-icon'
						width={80}
						height={80}
					/>
				</div>

				<FormInput name='email' label='E-Mail' required />
				<FormInput name='password' label='Пароль' type='password' required />

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Увійти
				</Button>
			</form>
		</FormProvider>
	)
}
