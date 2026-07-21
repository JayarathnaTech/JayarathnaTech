import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    // Automatically scroll to top whenever the route pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Show button when page is scrolled down past 300px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`group relative flex items-center justify-center h-12 w-12 rounded-2xl bg-slate-900/80 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 hover:border-indigo-400/80 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-500/30 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 ${
                    isVisible
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-75 pointer-events-none'
                }`}
            >
                {/* Glow aura effect on hover */}
                <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"></span>

                {/* Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="relative w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;
