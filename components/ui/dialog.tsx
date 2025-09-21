'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dialog(
	props: React.ComponentProps<typeof DialogPrimitive.Root>
) {
	return <DialogPrimitive.Root data-slot='dialog' {...props} />
}

export function DialogTrigger(
	props: React.ComponentProps<typeof DialogPrimitive.Trigger>
) {
	return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}

export function DialogPortal(
	props: React.ComponentProps<typeof DialogPrimitive.Portal>
) {
	return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

export function DialogClose(
	props: React.ComponentProps<typeof DialogPrimitive.Close>
) {
	return <DialogPrimitive.Close data-slot='dialog-close' {...props} />
}

export function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className
			)}
			{...props}
		/>
	)
}

export function DialogContent({
	className,
	children,
	showCloseButton = true,
	title = '',
	hideTitle = false,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean
	title?: React.ReactNode
	hideTitle?: boolean
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot='dialog-content'
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
					className
				)}
				{...props}
			>
				{hideTitle ? (
					<span className='sr-only'>
						<DialogPrimitive.Title>{title}</DialogPrimitive.Title>
					</span>
				) : (
					<DialogPrimitive.Title className='text-lg font-semibold'>
						{title}
					</DialogPrimitive.Title>
				)}

				{children}

				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='dialog-close'
						className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
					>
						<X />
						<span className='sr-only'>Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}
