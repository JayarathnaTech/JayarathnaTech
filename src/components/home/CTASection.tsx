import React from 'react';

const CTASection: React.FC = () => {
    return (
        <section id="contact" className="relative py-16 px-6">
            <div className="container mx-auto">
                <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-linear-to-br from-indigo-950/40 via-slate-950 to-slate-950/80 p-12 text-center shadow-2xl backdrop-blur-md max-w-4xl mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h3 className="text-3xl md:text-5xl font-extrabold text-white">Let's Engineer Your Next Venture</h3>
                        <p className="text-slate-300 text-base md:text-lg">
                            Ready to bring your complex systems or software ideas to life with high quality execution? Schedule a call with our principal engineer today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a
                                href="mailto:hello@jayarathnatech.com"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
                            >
                                Book a Consultation
                            </a>
                            <a
                                href="#services"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all duration-200"
                            >
                                View Our Work
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
