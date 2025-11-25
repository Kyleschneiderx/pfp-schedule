import { IconCalendar, IconChevronLeft, IconChevronRight, IconClock } from "@tabler/icons-react";
import clsx from "clsx";
import { format } from "date-fns";
import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
	timeOnly?: boolean;
	dateOnly?: boolean;
	className?: string;
	wrapperClassName?: string;
	calendarClassName?: string;
	timeFormat?: string;
	dateFormat?: string;
	value?: string | Date;
	showIcon?: boolean;
	onChange: (date: string) => void;
	timeInterval?: number;
}

const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
	<button onClick={onClick} type="button" ref={ref as any} className="flex items-center border px-3 py-2 rounded-lg">
		<IconClock className="mr-2 text-primary-500" />
		<span>{value || "Select time"}</span>
	</button>
));

const InputCalendar = ({
	timeFormat = "HH:mm:ss",
	dateFormat = "yyyy-MM-dd",
	onChange,
	className,
	wrapperClassName,
	calendarClassName,
	timeOnly,
	dateOnly,
	showIcon,
	timeInterval = 30,
	value,
	...rest
}: Props) => {
	const inputFormat = !timeOnly && !dateOnly ? `${dateFormat} ${timeFormat}` : dateOnly ? dateFormat : timeFormat;

	const [date, setDate] = useState<Date | null>(value ? new Date(value) : null);

	useEffect(() => {
		setDate(date ? new Date(date) : null);
	}, [value]);

	const handleOnChange = (date: Date | null) => {
		setDate(date);
		if (onChange) onChange(date ? format(date, inputFormat as string) : "");
	};

	return (
		<>
			<DatePicker
				className={clsx(
					"rounded text-neutral-900 text-sm py-1 pl-8 pr-2 border z-20 items-center w-full h-full",
					className,
				)}
				wrapperClassName={clsx("w-full h-full relative")}
				selected={date}
				inline
				timeIntervals={timeInterval} // step in minutes
				onChange={handleOnChange}
				dateFormat={inputFormat}
				showTimeCaption={false}
				timeFormat={timeFormat}
				showTimeSelect={(timeOnly ?? false) || (!timeOnly && !dateOnly)}
				showTimeSelectOnly={timeOnly}
				calendarClassName={clsx("bg-primary-500", calendarClassName)}
				disabledKeyboardNavigation
				renderCustomHeader={({ date, changeMonth }) => (
					<div className="flex justify-between items-center px-4">
						<button
							type="button"
							onClick={() => changeMonth(date.getMonth() - 1)}
							className="text-neutral-700/70 hover:text-neutral-700! cursor-pointer"
						>
							<IconChevronLeft size={18} />
						</button>
						<span className="text-base text-neutral-700">
							{date.toLocaleString("default", {
								month: "long",
								year: "numeric",
							})}
						</span>
						<button
							type="button"
							onClick={() => changeMonth(date.getMonth() + 1)}
							className="text-neutral-700/70 hover:text-neutral-700 cursor-pointer"
						>
							<IconChevronRight size={18} />
						</button>
					</div>
				)}
				{...rest}
			/>

			{showIcon && (
				<IconCalendar className="absolute w-5 left-2 top-1/2 transform -translate-y-1/2 text-primary-300/70" />
			)}
		</>
	);
};

export default InputCalendar;
