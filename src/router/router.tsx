import {createBrowserRouter} from "react-router";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Services from "../pages/Services.tsx";
import Contact from "../pages/Contact.tsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.tsx";
import TermsOfService from "../pages/TermsOfService.tsx";
import SubmitTestimonial from "../pages/SubmitTestimonial.tsx";
import AdminDashboard from "../pages/AdminDashboard.tsx";
import NotFound from "../pages/NotFound.tsx";
import RootLayout from "../layout/RootLayout.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/services',
                element: <Services/>
            },
            {
                path: '/contact',
                element: <Contact/>
            },
            {
                path: '/privacy',
                element: <PrivacyPolicy/>
            },
            {
                path: '/terms',
                element: <TermsOfService/>
            },
            {
                path: '/submit-testimonial/:token',
                element: <SubmitTestimonial/>
            },
            {
                path: '/admin',
                element: <AdminDashboard/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    }
], { basename: '/JayarathnaTech' })