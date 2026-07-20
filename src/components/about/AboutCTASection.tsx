import React from 'react';

const AboutCTASection: React.FC = () => {
    return (
        <section className="relative py-16 px-6">
            <div className="container mx-auto">
                <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950/80 p-12 text-center shadow-2xl backdrop-blur-md max-w-3xl mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                            Ready to Build Something Exceptional?
                        </h3>
                        <p className="text-slate-300 max-w-xl mx-auto">
                            As a growing agency, we bring the dedication of a startup with the discipline of an enterprise engineering team. Let's talk about your project.
                        </p>
                        <a
                            href="mailto:hello@jayarathnatech.com"
                            className="inline-block px-8 py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCTASection;
