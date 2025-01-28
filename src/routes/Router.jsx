import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/Common/Profile";
import RoleBasedDashboard from "../pages/Dashboard/RoleBasedDashboard";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/AdminPanel/AllUsers";
import RoleBasedRoute from "./RoleBasedRoute";
import AllBloodDonationRequest from "../pages/Dashboard/AdminPanel/AllBloodDonationRequest";
import ContentManagement from "../pages/Dashboard/AdminPanel/ContentManagement";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BlogPage from "../pages/BlogPage";
import SearchPage from "../pages/SearchPage";
import Funding from "../pages/Funding";
import DonationRequestDetails from "../pages/DonationRequestDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "search",
                element: <SearchPage></SearchPage>
            },
            {
                path: "donation-requests",
                element: <BloodDonationRequests></BloodDonationRequests>
            },
            {
                path: "blog",
                element: <BlogPage></BlogPage>
            },
            {
                path: "funding",
                element: <PrivateRoute>
                    <Funding></Funding>
                </PrivateRoute>
            },
            {
                path: "donation-request-details",
                element: <PrivateRoute>
                    <DonationRequestDetails></DonationRequestDetails>
                </PrivateRoute>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <RoleBasedDashboard></RoleBasedDashboard>
            },
            {
                path: "profile",
                element: <Profile></Profile>
            },
            {
                path: "my-donation-requests",
                element: <MyDonationRequests></MyDonationRequests>
            },
            {
                path: "create-donation-request",
                element: <CreateDonationRequest></CreateDonationRequest>
            },
            {
                path: "all-users",
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            {
                path: "all-blood-donation-request",
                element: <RoleBasedRoute>
                    <AllBloodDonationRequest></AllBloodDonationRequest>
                </RoleBasedRoute>
            },
            {
                path: "content-management",
                element: <RoleBasedRoute>
                    <ContentManagement></ContentManagement>
                </RoleBasedRoute>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    }
]);

export { router };