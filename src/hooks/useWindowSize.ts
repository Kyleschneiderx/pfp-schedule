import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

interface ResponsiveState {
	mobile: boolean;
	tablet: boolean;
	desktop: boolean;
	current: Breakpoint;
	width: number;
	height: number;
}

export function useWindowSize(): ResponsiveState {
	const [responsive, setResponsive] = useState<ResponsiveState>({
		mobile: false,
		tablet: false,
		desktop: false,
		current: "desktop",
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const breakpoints = {
			mobile: window.matchMedia("(max-width: 639px)"),
			tablet: window.matchMedia("(min-width: 640px) and (max-width: 1023px)"),
			desktop: window.matchMedia("(min-width: 1024px)"),
		};

		const update = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			const mobile = breakpoints.mobile.matches;
			const tablet = breakpoints.tablet.matches;
			const desktop = breakpoints.desktop.matches;

			let current: Breakpoint = "desktop";
			if (mobile) current = "mobile";
			else if (tablet) current = "tablet";

			setResponsive({ mobile, tablet, desktop, current, width, height });
		};

		// Initial check
		update();

		// Add resize listener
		window.addEventListener("resize", update);

		// Add media query listeners (optional, more precise)
		Object.values(breakpoints).forEach((mq) => {
			mq.addEventListener("change", update);
		});

		return () => {
			window.removeEventListener("resize", update);
			Object.values(breakpoints).forEach((mq) => {
				mq.removeEventListener("change", update);
			});
		};
	}, []);

	return responsive;
}
