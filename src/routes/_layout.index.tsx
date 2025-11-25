import {
	IconArrowLeft,
	IconCalendar,
	IconChevronRight,
	IconClock,
	IconFileInfo,
	IconStopwatch,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { addMinutes, format, parse, startOfDay } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Avatar from "@/components/core/avatar";
import { Button } from "@/components/core/buttons/button";
import { Input } from "@/components/core/forms/input";
import InputCalendar from "@/components/core/forms/input-calendar";
import { TextArea } from "@/components/core/forms/textarea";
import { useWindowSize } from "@/hooks/useWindowSize";

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
});

const STEP = {
	SELECT_PT: 1,
	SCHEDULE: 2,
	CONFIRM: 3,
	DONE: 4,
};

const SCHEDULE_STEP = {
	DATE: 1,
	TIME: 2,
};

type Schedule = {
	name: string;
	duration: number;
	description?: string;
};

function VisitDetails({
	onBack,
	schedule,
	date,
	time,
}: {
	onBack?: () => void;
	schedule: Schedule;
	date?: string;
	time?: string;
}) {
	return (
		<div className="p-5 w-full md:w-[500px] self-start h-full flex flex-col border-b md:border-r md:border-b-0 border-neutral-500/50">
			{onBack && (
				<button type="button" onClick={onBack}>
					<IconArrowLeft size={24} className="my-3 cursor-pointer hover:text-neutral-500" />
				</button>
			)}

			<div className="flex flex-col">
				<span className="text-sm font-semibold text-neutral-500">{schedule.name}</span>
				<span className="text-2xl font-semibold ">Telehealth Visit</span>
			</div>
			<div className="flex items-center space-x-1 mt-5">
				<IconStopwatch size={16} />
				<span className="text-sm ">{schedule.duration} minutes</span>
			</div>

			<div className="flex items-center space-x-1 mt-3">
				<IconCalendar size={16} />
				<span className="text-sm flex items-center space-x-1">{format(new Date(`${date}`), "MMM dd, yyyy")}</span>
			</div>
			<div className="flex items-center space-x-1 mt-3">
				<IconClock size={16} />
				<span className="text-sm flex items-center space-x-1">
					{time
						? `${format(new Date(`${date} ${time}`), "hh:mm aa")} - ${format(addMinutes(new Date(`${date} ${time}`), 30), "hh:mm aa")}`
						: "N/A"}
				</span>
			</div>

			<div className="flex items-center space-x-1 mt-3">
				<IconFileInfo size={16} className="shrink-0 self-start" />
				<span className="text-sm ">{schedule.description}</span>
			</div>
		</div>
	);
}

function VisitScheduled() {
	return (
		<div className="flex flex-col w-full justify-center items-center m-auto gap-3">
			<span className="text-3xl font-semibold text-center">Visit has been Scheduled</span>
			<p className="px-auto md:px-16 text-center">
				Your visit will be performed inside our free application please download with the links below
			</p>
			<div className="flex flex-col gap-3 mt-5">
				<a href="https://apps.apple.com/app/id6737835957" target="_blank" rel="noopener noreferrer">
					<img src="/images/app-store-btn.png" alt="app-store" className="w-64" />
				</a>
				<a
					href="https://play.google.com/store/apps/details?id=com.lakecitypt.pelvic_floor_pro"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="/images/google-play-btn.png" alt="app-store" className="w-64" />
				</a>
				{/* <Button icon={<img src="/images/logo.png" alt="logo" className="w-12 drop-shadow rounded" />}>
										<div className="flex flex-col text-start -space-y-1">
											<span className="text-base font-normal text-neutral-200">Open Your</span>
											<span className="text-3xl font-normal text-neutral-100">Pelvic Floor Pro</span>
										</div>
									</Button> */}
			</div>
		</div>
	);
}

function RouteComponent() {
	const [step, setStep] = useState(STEP.SCHEDULE);
	const [scheduleStep, setScheduleStep] = useState(SCHEDULE_STEP.DATE);
	const { desktop: isDesktop } = useWindowSize();
	const form = useForm({
		shouldUnregister: false,
		defaultValues: {
			date: format(startOfDay(new Date()), "yyyy-MM-dd"),
			time: "",
			email: "",
			name: "",
			notes: "",
		},
	});
	const schedule = {
		name: "John Doe",
		duration: 30,
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lectus risus, aliquet non nisl ac, rhoncus
					aliquam orci. Phasellus orci ipsum, blandit vitae semper a, condimentum et elit. Nullam venenatis ante eu
					augue viverra maximus. Quisque placerat odio eu dapibus commodo. Etiam vestibulum massa quis tincidunt
					condimentum.`,
	};
	const pts = [
		{
			name: "John Doe",
			photo: "",
			id: 1,
		},
		{
			name: "John Doe",
			photo: "",
			id: 2,
		},
		{
			name: "John Doe",
			photo: "",
			id: 3,
		},
		{
			name: "John Doe",
			photo: "",
			id: 4,
		},
		{
			name: "John Doe",
			photo: "",
			id: 5,
		},
		{
			name: "John Doe",
			photo: "",
			id: 6,
		},
		{
			name: "John Doe",
			photo: "",
			id: 7,
		},
		{
			name: "John Doe",
			photo: "",
			id: 8,
		},
		{
			name: "John Doe",
			photo: "",
			id: 9,
		},
		{
			name: "John Doe",
			photo: "",
			id: 10,
		},
	];

	const onSubmit = async () => {};

	const data = form.watch();

	return (
		<div
			className={clsx(
				"self-center justify-self-center  w-full m-auto",
				step === STEP.SELECT_PT ? "max-w-xs" : "max-w-5xl",
			)}
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col md:flex-row bg-white drop-shadow-center min-w-full md:min-w-3xs max-h-full md:max-h-[80vh] min-h-full sm:min-h-[480px] h-screen overflow-auto md:overflow-hidden md:h-[480px] text-neutral-700 rounded-xl">
					{step !== STEP.SELECT_PT && (
						<VisitDetails
							onBack={isDesktop && step === STEP.CONFIRM ? () => setStep(STEP.SCHEDULE) : undefined}
							schedule={schedule}
							date={data.date}
							time={data.time}
						/>
					)}

					<div className="flex flex-col h-full w-full p-5 self-start">
						{step === STEP.SELECT_PT ? (
							<div className="flex flex-col gap-3 px-3 overflow-auto">
								<span className="self-center font-semibold">Select Physical Therapist</span>
								{pts.map((pt) => (
									<button
										key={pt.id}
										type="button"
										className="flex items-center cursor-pointer gap-3 transition-all hover:scale-105"
										onClick={() => setStep(STEP.SCHEDULE)}
									>
										<div className="w-12 h-12">
											<Avatar src={""} placeholder="/images/avatar.jpg" className="w-12 h-12" />
										</div>
										<span className="font-semibold">{pt.name}</span>
										<IconChevronRight size={16} className="ml-auto" />
									</button>
								))}
							</div>
						) : step === STEP.SCHEDULE ? (
							<>
								<span className={clsx("font-semibold ", !isDesktop ? "self-center" : "self-start")}>
									Select {isDesktop ? "a Date & Time" : scheduleStep === SCHEDULE_STEP.DATE ? "Date" : "Time"}
								</span>

								<div className={clsx("flex items-center justify-center gap-3 h-full", isDesktop ? "mt-10" : "mt-3")}>
									{(isDesktop || SCHEDULE_STEP.DATE === scheduleStep) && (
										<div className="self-start flex flex-col items-center justify-center gap-3 w-full">
											<Controller
												name="date"
												control={form.control}
												render={({ field }) => {
													return (
														<InputCalendar
															calendarClassName="sm:w-xs"
															className=""
															value={field.value}
															dateOnly
															onChange={(e) => {
																console.log(e);
																field.onChange(e);
																setScheduleStep(SCHEDULE_STEP.TIME);
															}}
														/>
													);
												}}
											/>
											{/* {!isDesktop && (
												<Button
													type="button"
													variant="primary"
													className="w-32 self-center"
													onClick={() => setScheduleStep(SCHEDULE_STEP.TIME)}
												>
													Next
												</Button>
											)} */}
										</div>
									)}
									{(isDesktop || scheduleStep === SCHEDULE_STEP.TIME) && (
										<div
											className={clsx(
												"self-start flex flex-col items-center justify-center gap-3 w-full min-w-[240px]",
												!isDesktop && "h-full",
											)}
										>
											<span className={clsx(" flex items-center space-x-1 my-3")}>
												{format(new Date(`${data.date}`), "EEEE, MMMM d")}
											</span>
											<Controller
												name="time"
												control={form.control}
												render={({ field }) => {
													return (
														<InputCalendar
															calendarClassName={clsx("", isDesktop ? "min-w-[240px]" : "w-full")}
															timeFormat="hh:mm aa"
															timeOnly
															value={
																field.value
																	? format(parse(field.value, "HH:mm:ss", new Date()), "yyyy-MM-dd hh:mm aa")
																	: undefined
															}
															onChange={(e) => {
																const parsedVal = format(parse(e, "hh:mm aa", new Date()), "HH:mm:ss");
																field.onChange(parsedVal);
															}}
														/>
													);
												}}
											/>
											{!isDesktop && (
												<div className="flex flex-col space-y-1 w-32 self-center">
													<Button
														type="button"
														variant="primary"
														disabled={!data.time}
														className="w-full self-center"
														onClick={() => setStep(STEP.CONFIRM)}
													>
														Next
													</Button>
													<Button
														type="button"
														variant="outline"
														className="w-full self-center"
														onClick={() => setScheduleStep(SCHEDULE_STEP.DATE)}
													>
														Back
													</Button>
												</div>
											)}
										</div>
									)}
								</div>
								{isDesktop && (
									<Button
										type="button"
										variant="primary"
										disabled={!data.time}
										className="w-32 self-center"
										onClick={() => setStep(STEP.CONFIRM)}
									>
										Next
									</Button>
								)}
							</>
						) : step === STEP.CONFIRM ? (
							<div className={clsx("self-start flex flex-col space-y-3 mt-3 min-w-[230px] w-full")}>
								<span className="font-semibold">Enter Details</span>
								<div className="flex flex-col space-y-1">
									<span className="text-sm">
										Name <span className="text-error-500">*</span>
									</span>
									<Controller
										name="name"
										control={form.control}
										render={({ field }) => (
											<Input placeholder="Enter name" value={field.value} onChange={field.onChange} />
										)}
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-sm">
										Email <span className="text-error-500">*</span>
									</span>
									<Controller
										name="email"
										control={form.control}
										render={({ field }) => (
											<Input placeholder="Enter email" value={field.value} onChange={field.onChange} />
										)}
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-sm">Notes</span>
									<Controller
										name="notes"
										control={form.control}
										render={({ field }) => (
											<TextArea
												placeholder="Enter notes"
												rows={5}
												className="resize-none outline-none"
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</div>
								<div className="flex flex-col space-y-1 w-48 self-center mt-5">
									<Button
										type="button"
										variant="primary"
										className="w-full self-center"
										onClick={() => setStep(STEP.DONE)}
									>
										Schedule Visit
									</Button>
									<Button
										type="button"
										variant="outline"
										className="w-full self-center block sm:hidden"
										onClick={() => {
											setScheduleStep(SCHEDULE_STEP.TIME);
											setStep(STEP.SCHEDULE);
										}}
									>
										Back
									</Button>
								</div>
							</div>
						) : (
							<VisitScheduled />
						)}
					</div>
				</div>
			</form>
		</div>
	);
}
