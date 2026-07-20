import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
    const [glitchActive, setGlitchActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden bg-slate-950 min-h-screen flex flex-col items-center justify-center px-6">

            {/* Background glows */}
            <div className="absolute top-[-10%] right-[-5%] w-160 h-160 rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-5%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-10">

                {/* 404 number */}
                <div className="relative select-none">
                    <span
                        className={`text-[10rem] md:text-[14rem] font-black leading-none bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 transition-all duration-100 ${
                            glitchActive ? 'blur-[2px] translate-x-1' : ''
                        }`}
                    >
                        404
                    </span>
                    {/* Glitch layers */}
                    {glitchActive && (
                        <>
                            <span className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none text-indigo-500/40 translate-x-2 translate-y-1 select-none">
                                404
                            </span>
                            <span className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none text-pink-500/30 -translate-x-2 -translate-y-1 select-none">
                                404
                            </span>
                        </>
                    )}
                </div>

                {/* Label badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse inline-block" />
                    Page Not Found
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Lost in the <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">void</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </div>

                {/* Terminal-style error block */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-left font-mono text-xs text-slate-400 space-y-1 backdrop-blur-sm">
                    <div><span className="text-indigo-400">$</span> GET {window.location.pathname}</div>
                    <div><span className="text-rose-400">Error:</span> 404 — Resource not found</div>
                    <div><span className="text-slate-500">→</span> Redirecting to safe zone...</div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-4 rounded-xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        ← Back to Home
                    </Link>
                    <Link
                        to="/contact"
                        className="px-8 py-4 rounded-xl font-bold bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
                    >
                        Contact Support
                    </Link>
                </div>

                {/* Quick links */}
                <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center text-sm text-slate-500">
                    {[
                        { label: 'Home', to: '/' },
                        { label: 'About', to: '/about' },
                        { label: 'Services', to: '/services' },
                        { label: 'Contact', to: '/contact' },
                    ].map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            className="hover:text-indigo-400 transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
