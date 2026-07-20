import React from 'react';
import {Outlet} from "react-router";
import NavigationBar from "../components/NavigationBar.tsx";

const RootLayout :React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
            <NavigationBar/>
            <main className="flex-grow">
                <Outlet/>
            </main>
        </div>
    );
};

export default RootLayout;