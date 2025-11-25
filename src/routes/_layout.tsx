import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative bg-cover bg-center min-h-screen p-0 md:p-5 flex bg-[linear-gradient(to_right,rgba(255,255,255,0.95),rgba(255,255,255,0.7)),url('/images/login-bg.png')]">
			<Outlet />
		</div>
	);
}
