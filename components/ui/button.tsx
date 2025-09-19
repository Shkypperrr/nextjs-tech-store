'use client'

import * as React from 'react'
import { Loader } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500 cursor-pointer',
	{
		variants: {
			variant: {
				primary:
					'w-full h-14 text-base text-white bg-blue-600 hover:bg-blue-700',
				outline:
					'w-full h-14 text-base border border-blue-600 text-blue-600 hover:bg-blue-50',
			},
			size: {
				default: 'px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-14 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, children, variant, size, loading, disabled, ...props },
		ref
	) => {
		return (
			<button
				ref={ref}
				disabled={disabled || loading}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			>
				{loading ? <Loader className='w-5 h-5 animate-spin' /> : children}
			</button>
		)
	}
)

Button.displayName = 'Button'
