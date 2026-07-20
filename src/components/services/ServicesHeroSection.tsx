import React from 'react';

const ServicesHeroSection: React.FC = () => {
    return (
        <section className="relative pt-20 pb-16 px-6 text-center">
            <div className="container mx-auto max-w-3xl space-y-5">
                <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 w-fit mx-auto">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">Our Offerings</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    Custom{' '}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                        Engineering Services
                    </span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                    From enterprise-grade web platforms to performant mobile applications, we build fast, scalable, and beautifully designed digital solutions.
                </p>
            </div>
        </section>
    );
};

export default ServicesHeroSection;
