import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
	icon?: ReactNode;
};

export const Button = ({
	children,
	variant = "primary",
	size = "md",
	fullWidth = false,
	icon,
	className,
	...props
}: ButtonProps) => {
	const baseClasses =
		"inline-flex items-center justify-center rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const variantClasses = {
		primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400",
		secondary: "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400",
		outline: "border border-primary-300 text-primary-700 hover:bg-primary-100 focus:ring-primary-400",
		ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-400",
	};

	return (
		<button
			className={clsx(
				baseClasses,
				sizeClasses[size],
				variantClasses[variant],
				fullWidth && "w-full",
				className,
				"disabled:bg-black/20",
			)}
			{...props}
		>
			{icon && <span className="mr-2">{icon}</span>}
			{children}
		</button>
	);
};
