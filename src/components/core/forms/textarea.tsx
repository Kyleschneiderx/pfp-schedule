import clsx from "clsx";
import type React from "react";
import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	error?: boolean;
};

export const TextArea: React.FC<TextAreaProps> = ({ className, error, ...props }) => {
	return (
		<textarea
			className={clsx(
				"block w-full rounded border px-3 py-2 text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500",
				error ? "border-red-500 focus:ring-red-400" : "border-neutral-300",
				className,
			)}
			{...props}
		/>
	);
};
