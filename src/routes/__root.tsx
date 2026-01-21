import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../App.css";
import { Navbar } from "../components/Navbar.tsx";

const RootLayout = () => {
  const hideNavRoutes = ["/"]; // Hide on root path; add more paths if needed
  const matchRoute = useMatchRoute();

  const isHideNavRoute = hideNavRoutes.some((route) =>
    matchRoute({ to: route }),
  );

  return (
    <>
      {!isHideNavRoute && <Navbar />}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
