import React from 'react';

const webFeatures = [
    { title: 'Interactive User Interfaces', desc: 'Component-driven SPAs using React and Next.js, designed for optimal performance.' },
    { title: 'Robust Backend APIs', desc: 'Secure, RESTful and GraphQL APIs built with Laravel and Spring Boot.' },
    { title: 'Relational Database Design', desc: 'Structured, transactional, and indexed data storage using MySQL.' },
    { title: 'Server-Side Rendering (SSR)', desc: 'Optimised loading speeds and search engine positioning with Next.js.' },
];

const WebDevelopmentSection: React.FC = () => {
    return (
        <section className="relative py-16 px-6 border-t border-slate-900/60 bg-slate-950/20">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Visual Mockup/Illustration */}
                    <div className="lg:col-span-5 order-2 lg:order-1 relative">
                        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/10 blur-xl pointer-events-none"></div>
                        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-sm space-y-4">
                            <div className="flex space-x-2 pb-2 border-b border-slate-800">
                                <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                                <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                                <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
                            </div>
                            <div className="space-y-2 text-xs font-mono text-indigo-300">
                                <p className="text-slate-500">// Modern Web Application</p>
                                <p><span className="text-pink-400">const</span> app = <span className="text-yellow-400">NextProject</span>.init();</p>
                                <p>app.useFrontend(<span className="text-emerald-400">'React / Next.js'</span>);</p>
                                <p>app.useBackend(<span className="text-emerald-400">'Laravel / Spring'</span>);</p>
                                <p>app.deployWith(<span className="text-emerald-400">'Docker & K8s'</span>);</p>
                                <p className="text-slate-500">// Architecture Status: SOLID</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            Enterprise Web Solutions
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            High-Performance Web App Development
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            We build enterprise-grade web applications designed for maximum scalability, security, and response times. Utilizing React/Next.js for interfaces and Laravel/Spring Boot for API services, we deliver experiences that feel native, rapid, and visually stunning.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {webFeatures.map((feat) => (
                                <div key={feat.title} className="p-4 rounded-xl border border-slate-900 bg-slate-900/30 space-y-1">
                                    <h4 className="text-white font-bold text-sm flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                                        {feat.title}
                                    </h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WebDevelopmentSection;
