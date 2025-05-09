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
import AllUsers from "../pages/Dashboard/AdminPanel/AllUsers";
import RoleBasedRoute from "./RoleBasedRoute";
import AllBloodDonationRequest from "../pages/Dashboard/AdminPanel/AllBloodDonationRequest";
import ContentManagement from "../pages/Dashboard/AdminPanel/ContentManagement";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BlogPage from "../pages/BlogPage";
import SearchPage from "../pages/SearchPage";
import Funding from "../pages/Funding";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import UpdateDonationRequest from "../pages/Dashboard/Donor/UpdateDonationRequest";
import AddBlog from "../pages/Dashboard/AdminPanel/AddBlog";
import BlogDetails from "../pages/BlogDetails";
import ViewBlog from "../pages/Dashboard/AdminPanel/ViewBlog";
import GiveFund from "../pages/GiveFund/GiveFund";
import AboutUs from "../pages/AboutUs";
import FAQPage from "../pages/FAQPage";
import BloodDonationTips from "../pages/BloodDonationTips";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";

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
                path: "about-us",
                element: <AboutUs></AboutUs>
            },
            {
                path: "faq",
                element: <FAQPage></FAQPage>
            },
            {
                path: "blood-donation-tips",
                element: <BloodDonationTips></BloodDonationTips>
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: "terms-of-service",
                element: <TermsOfService></TermsOfService>
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
                path: "blog/:id",
                element: <BlogDetails></BlogDetails>
            },
            {
                path: "funding",
                element: <PrivateRoute>
                    <Funding></Funding>
                </PrivateRoute>
            },
            {
                path: "give-fund",
                element: <PrivateRoute>
                    <GiveFund></GiveFund>
                </PrivateRoute>
            },
            {
                path: "donation-request-details/:id",
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
                path: "update-donation-request/:id",
                element: <UpdateDonationRequest></UpdateDonationRequest>
            },
            {
                path: "all-users",
                element: <RoleBasedRoute>
                    <AllUsers></AllUsers>
                </RoleBasedRoute>
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
            {
                path: "content-management/add-blog",
                element: <RoleBasedRoute>
                    <AddBlog></AddBlog>
                </RoleBasedRoute>
            },
            {
                path: "content-management/view-blog/:id",
                element: <RoleBasedRoute>
                    <ViewBlog></ViewBlog>
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