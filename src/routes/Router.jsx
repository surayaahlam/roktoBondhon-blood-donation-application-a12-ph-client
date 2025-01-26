import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    }
]);

export { router };