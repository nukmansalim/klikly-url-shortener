import react from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Landing from "../pages/index.jsx";
import Dashboard from "../pages/dashboard.jsx";
import Login from "../pages/login.jsx";
import Index from "../pages/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
               index:true,
                element: <Index />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]);

export const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}