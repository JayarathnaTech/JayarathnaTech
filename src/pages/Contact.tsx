import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import FooterSection from '../components/FooterSection';

const Contact: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-slate-950 pb-24 min-h-screen flex flex-col justify-between">
            {/* Background Glows */}
            <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none"></div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24 relative z-10 flex-grow">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Branding and Credentials */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest">
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                Get in Touch
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                Let's Build <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Something Great.
                                </span>
                            </h1>
                            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-md">
                                Have a technical question, feedback, or a business inquiry? I'm always open to discussing new projects or creative software ideas.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Glassmorphic Contact Form */}
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] -z-10" />

                        <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </div>

            <FooterSection />
        </div>
    );
};

export default Contact;
