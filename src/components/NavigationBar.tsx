import React from 'react';
import {NavLink} from "react-router";

const NavigationBar :React.FC= () => {
    return (
        <nav className='bg-white p-4 shadow-lg'>
            <div className="container mx-auto flex justify-between items-center">
                <div className='w-64'>
                    <svg id="njtools-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="97.5 229.5 547.4 104.5" className="w-full h-full object-contain">
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                {/* 'stop-color' -> 'stopColor' */}
                                <stop offset="0%" stopColor="#475569"/>
                                <stop offset="100%" stopColor="#0f172a"/>
                            </linearGradient>
                        </defs>
                        <g transform="translate(10, 0)">
                            <g transform="translate(117.5, 249.5)">
                                <svg width="85" height="85" viewBox="0 0 100 100">
                                    <g transform="translate(10, 10) scale(0.8)">
                                        <path d="M50 12 L88 34 V76 L50 98 L12 76 V34 Z" fill="url(#logoGrad)"/>
                                        {/* 'stroke-width' -> 'strokeWidth', 'stroke-linecap' -> 'strokeLinecap' */}
                                        <path d="M50 12 V55 L12 34 M50 55 L88 34 M50 55 L50 98" stroke="#ffffff"
                                              strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>
                                        <circle cx="50" cy="55" r="10" fill="#ffffff" opacity="0.25"/>
                                    </g>
                                </svg>
                            </g>
                            {/* 'text-anchor' -> 'textAnchor', 'font-family' -> 'fontFamily', 'font-size' -> 'fontSize', 'font-weight' -> 'fontWeight', 'letter-spacing' -> 'letterSpacing', 'dominant-baseline' -> 'dominantBaseline' */}
                            <text x="232.5" y="295" textAnchor="start" fill="#475569" fontFamily="Cinzel"
                                  fontSize="38" fontWeight="900" letterSpacing="0.5"
                                  dominantBaseline="middle">JayarathnaTech
                            </text>
                        </g>
                    </svg>
                </div>
                <div className='flex space-x-6 text-gray-800 font-medium'>
                    <NavLink to='/' className='hover:text-gray-500 cursor-pointer'>Home</NavLink>
                    <NavLink to='/about' className='hover:text-gray-500 cursor-pointer'>About</NavLink>
                    <NavLink to='/services' className='hover:text-gray-500 cursor-pointer'>Services</NavLink>
                    {/*<NavLink to='/services' className='hover:text-gray-500 cursor-pointer'>Projects</NavLink>*/}
                    <NavLink to='/contact' className='hover:text-gray-500 cursor-pointer'>Contact</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;