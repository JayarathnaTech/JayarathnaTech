import {createBrowserRouter} from "react-router";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
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
            }
        ]
    }
])