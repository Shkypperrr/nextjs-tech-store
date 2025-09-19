'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutSidebar } from '@/components/shared'
import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import { useCart } from '@/hooks'
import {
	CheckoutAddressForm,
	CheckoutCart,
	checkoutFormSchema,
	CheckoutPersonalForm,
} from '@/components/shared/checkout'
import React from 'react'
import toast from 'react-hot-toast'
import { CheckoutFormValues } from '@/constans/checkout-form-schemas'
import { createOrder } from '@/app/actions'
import { useSession } from 'next-auth/react'
import { Api } from '@/services/api-client'

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false)
	const {
		addCartItem,
		items,
		loading,
		removeCartItem,
		totalAmount,
		updateItemQuantity,
	} = useCart()
	const { data: session } = useSession()

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe()
			const [firstName, lastName] = data.fullName.split(' ')

			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
			form.setValue('email', data.email)
		}

		if (session) {
			fetchUserInfo()
		}
	}, [session])

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true)

			const url = await createOrder(data)

			toast.error('Замовлення успішно оформлене! 📝', {
				icon: '✅',
			})

			if (url) {
				location.href = url
			}
		} catch (err) {
			console.log(err)
			setSubmitting(false)
			toast.error('Не вдалося створити замовлення', {
				icon: '❌',
			})
		}
	}
	return (
		<Container className='mt-10'>
			<Title
				text='Оформлення замовлення'
				className='font-extrabold mb-8 text-[36px]'
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							<CheckoutAddressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						<div className='w-[450px]'>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
