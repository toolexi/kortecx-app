import './App.css'
// import {  BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { router } from './router.tsx';
import { createRootRoute, createRoute } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: () => <div>Root Layout <Outlet /></div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <h1>Home Page</h1>,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <h1>About Page</h1>,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

function App() {

  return <RouterProvider router={router} />
}

export default App
