import React from 'react';

const processSteps = [
    { num: '01', title: 'Strategy & Spec', desc: 'Detailed specifications mapping backend contracts, database entities, and client interfaces.' },
    { num: '02', title: 'Automated Testing', desc: 'Codebase builds accompanied by Vitest, JUnit, or PHPUnit unit and integration tests.' },
    { num: '03', title: 'Orchestrated Dev', desc: 'Containerised development using Docker and Kubernetes to ensure environment consistency.' },
    { num: '04', title: 'Continuous Delivery', desc: 'Automated pipelines verifying tests on Pull Request and building live versions.' },
];

const ServicesProcessSection: React.FC = () => {
    return (
        <section className="relative py-20 px-6 border-t border-slate-900/60 bg-slate-950/30">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Our Methodology</p>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">How We Build Quality Software</h3>
                    <p className="text-slate-400">
                        We leverage modern deployment technologies and automated pipeline verification steps to eliminate errors and maintain extreme stability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {processSteps.map((step) => (
                        <div
                            key={step.num}
                            className="group relative rounded-2xl border border-slate-900 bg-slate-900/20 p-6 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all duration-300 flex flex-col"
                        >
                            <span className="text-4xl font-black text-slate-800 group-hover:text-indigo-500/20 transition-colors mb-4">{step.num}</span>
                            <h4 className="text-white font-bold text-base mb-2">{step.title}</h4>
                            <p className="text-slate-400 text-xs leading-relaxed flex-grow">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesProcessSection;
