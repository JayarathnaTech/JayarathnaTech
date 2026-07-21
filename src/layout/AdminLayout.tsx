import React from 'react';
import {Outlet} from "react-router";
import ScrollToTop from "../components/ScrollToTop.tsx";

const RootLayout :React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
            <ScrollToTop />
            <main className="grow">
                <Outlet/>
            </main>
        </div>
    );
};

export default RootLayout;