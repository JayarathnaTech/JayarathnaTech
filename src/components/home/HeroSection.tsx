import React, { useEffect, useState } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../firebase';

const HeroSection: React.FC = () => {
    const [testimonialCount, setTestimonialCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchTestimonialCount = async () => {
            try {
                const coll = collection(db, 'testimonials');
                const snapshot = await getCountFromServer(coll);
                setTestimonialCount(snapshot.data().count);
            } catch (err) {
                console.error('Error fetching testimonial count:', err);
            }
        };
        fetchTestimonialCount();
    }, []);

    return (
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-6">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col space-y-8 text-left z-10">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 w-fit shadow-inner">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-xs md:text-sm font-semibold tracking-wider text-indigo-300 uppercase">
                            Next-Gen Engineering
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white">
                        We Engineer <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Premium Digital
                        </span> <br />
                        Experiences
                    </h1>

                    <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
                        JayarathnaTech is a bespoke software agency delivering high-performance web applications, scalable cloud architecture, and intelligent neural solutions built with clean, modular code.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="#contact"
                            className="px-8 py-4 rounded-xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Start Your Project
                        </a>
                        <a
                            href="#services"
                            className="px-8 py-4 rounded-xl font-bold bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
                        >
                            Explore Expertise
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-900/60">
                        <div>
                            <div className="text-3xl font-extrabold text-white">
                                {testimonialCount !== null ? `${testimonialCount}+` : '0+'}
                            </div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Client Reviews</div>
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-indigo-400">99.9%</div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Client Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-white">10M+</div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Users Impacted</div>
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-purple-400">15+</div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Global Tech Experts</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 relative flex justify-center items-center z-10">
                    <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 opacity-25 blur-xl animate-pulse"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-md max-w-full">
                        <div className="flex items-center space-x-2 px-3 pb-3 pt-1 border-b border-slate-800/50">
                            <span className="h-3.5 w-3.5 rounded-full bg-rose-500/70 inline-block"></span>
                            <span className="h-3.5 w-3.5 rounded-full bg-amber-500/70 inline-block"></span>
                            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/70 inline-block"></span>
                            <span className="text-xs text-slate-500 pl-4 font-mono select-none">jayarathnatech.com/analytics</span>
                        </div>
                        <img
                            src={`${import.meta.env.BASE_URL}dashboard_mockup.png`}
                            alt="JayarathnaTech Platform Analytics Dashboard"
                            className="w-full h-auto object-cover rounded-lg shadow-inner max-h-105 transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
