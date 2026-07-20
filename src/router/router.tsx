import {createBrowserRouter} from "react-router";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Services from "../pages/Services.tsx";
import Contact from "../pages/Contact.tsx";
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
            }
        ]
    }
])