import React from 'react';
import {Outlet} from "react-router";
import NavigationBar from "../components/NavigationBar.tsx";

const RootLayout :React.FC = () => {
    return (
        <>
            <NavigationBar/>
            <main className="container mx-auto mt-5">
                <Outlet/>
            </main>
        </>
    );
};

export default RootLayout;