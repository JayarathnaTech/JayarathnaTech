import React from 'react';

const mobileFeatures = [
    { title: 'Cross-Platform Excellence', desc: 'Performant mobile apps running smoothly on both iOS and Android from a unified codebase.' },
    { title: 'Offline-First Architectures', desc: 'Robust client-side databases ensuring your app remains responsive without network coverage.' },
    { title: 'Push Notifications', desc: 'Real-time user engagement systems wired up via Firebase Cloud Messaging.' },
    { title: 'Smooth Gestures & Animations', desc: 'Rich micro-interactions and smooth frame transitions built for responsive mobile UX.' },
];

const MobileDevelopmentSection: React.FC = () => {
    return (
        <section className="relative py-16 px-6 border-t border-slate-900/60 bg-slate-950/10">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Content */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            Mobile First Design
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            Native-Grade Mobile App Development
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            We build intuitive mobile applications tailored to capture markets and engage users on the go. Focusing on clean state management, cross-platform performance, and smooth gesture transitions, our applications run flawlessly on both modern iOS and Android operating systems.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {mobileFeatures.map((feat) => (
                                <div key={feat.title} className="p-4 rounded-xl border border-slate-900 bg-slate-900/30 space-y-1">
                                    <h4 className="text-white font-bold text-sm flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                        {feat.title}
                                    </h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Mockup/Illustration */}
                    <div className="lg:col-span-5 relative flex justify-center">
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-purple-500/20 to-pink-500/10 blur-xl pointer-events-none"></div>
                        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-sm w-64 h-96 flex flex-col justify-between">
                            <div className="w-full flex justify-between items-center pb-2 border-b border-slate-800">
                                <span className="text-[10px] font-mono text-slate-500">12:00 PM</span>
                                <span className="h-2 w-12 rounded-full bg-slate-800"></span>
                                <span className="text-[10px] font-mono text-slate-500">🔋 100%</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center items-center space-y-3">
                                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">📱</div>
                                <p className="text-white text-xs font-bold font-mono">Mobile App Engine</p>
                                <p className="text-slate-500 text-[10px] font-mono">Status: Connected</p>
                            </div>
                            <div className="h-1.5 w-20 rounded-full bg-slate-800 mx-auto"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MobileDevelopmentSection;
