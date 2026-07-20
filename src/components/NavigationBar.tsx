import React from 'react';
import {NavLink} from "react-router";

const NavigationBar :React.FC= () => {
    return (
        <nav className='sticky top-0 z-50 backdrop-blur-lg bg-slate-950/75 border-b border-slate-800/40 px-6 py-4 shadow-xl transition-all duration-300'>
            <div className="container mx-auto flex justify-between items-center">
                <div className='w-56 h-12 flex items-center'>
                    <svg id="njtools-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="97.5 229.5 547.4 104.5" className="w-full h-full object-contain">
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1"/>
                                <stop offset="100%" stopColor="#a855f7"/>
                            </linearGradient>
                        </defs>
                        <g transform="translate(10, 0)">
                            <g transform="translate(117.5, 249.5)">
                                <svg width="85" height="85" viewBox="0 0 100 100">
                                    <g transform="translate(10, 10) scale(0.8)">
                                        <path d="M50 12 L88 34 V76 L50 98 L12 76 V34 Z" fill="url(#logoGrad)"/>
                                        <path d="M50 12 V55 L12 34 M50 55 L88 34 M50 55 L50 98" stroke="#ffffff"
                                              strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>
                                        <circle cx="50" cy="55" r="10" fill="#ffffff" opacity="0.25"/>
                                    </g>
                                </svg>
                            </g>
                            <text x="232.5" y="295" textAnchor="start" fill="#f8fafc" fontFamily="Outfit, Inter, sans-serif"
                                  fontSize="40" fontWeight="900" letterSpacing="0.8"
                                  dominantBaseline="middle">JayarathnaTech
                            </text>
                        </g>
                    </svg>
                </div>
                <div className='flex items-center space-x-8 text-slate-300 font-medium text-sm md:text-base'>
                    <NavLink to='/' className={({isActive}) => `relative py-1 hover:text-indigo-400 transition-colors duration-200 ${isActive ? 'text-indigo-400 font-semibold' : ''}`}>
                        Home
                    </NavLink>
                    <NavLink to='/about' className={({isActive}) => `relative py-1 hover:text-indigo-400 transition-colors duration-200 ${isActive ? 'text-indigo-400 font-semibold' : ''}`}>
                        About
                    </NavLink>
                    <NavLink to='/services' className={({isActive}) => `relative py-1 hover:text-indigo-400 transition-colors duration-200 ${isActive ? 'text-indigo-400 font-semibold' : ''}`}>
                        Services
                    </NavLink>
                    <NavLink to='/contact' className='bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-300 scale-95 hover:scale-100 cursor-pointer'>
                        Contact Us
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;