import React from 'react';

const pipelineSteps = [
    { icon: '📝', label: 'Push / PR',       sublabel: 'GitHub' },
    { icon: '🔍', label: 'Lint & Type Check', sublabel: 'ESLint / TSC' },
    { icon: '✅', label: 'Automated Tests', sublabel: 'Vitest / JUnit' },
    { icon: '🐳', label: 'Docker Build',    sublabel: 'Container Image' },
    { icon: '☸️', label: 'K8s Deploy',      sublabel: 'Kubernetes' },
    { icon: '🚀', label: 'Live Production', sublabel: 'Zero-Downtime' },
];

const PipelineSection: React.FC = () => {
    return (
        <section className="relative py-20 px-6 border-t border-slate-900/60 bg-slate-950/30">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-14 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Automation First</p>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">Our CI/CD Pipeline Flow</h3>
                    <p className="text-slate-400">
                        Every commit triggers an automated workflow that validates, tests, and deploys without human intervention — shipping confidence, not just code.
                    </p>
                </div>

                <div className="flex flex-row justify-center items-start gap-1 md:gap-3 px-4">
                    {pipelineSteps.map((step, i, arr) => (
                        <React.Fragment key={step.label}>
                            <div className="flex flex-col items-center shrink-0 w-20 md:w-28">
                                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-center text-xl md:text-2xl mb-3 shadow-lg hover:border-indigo-500/50 transition-all duration-300">
                                    {step.icon}
                                </div>
                                <p className="text-white text-[10px] md:text-xs font-bold text-center leading-tight">{step.label}</p>
                                <p className="text-slate-500 text-[9px] md:text-[10px] text-center mt-1 whitespace-nowrap">{step.sublabel}</p>
                            </div>

                            {i < arr.length - 1 && (
                                <div className="flex items-start pt-5">
                                    <div className="flex items-center">
                                        <div className="h-px w-3 md:w-6 bg-indigo-500/40"></div>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 md:w-3 md:h-3 text-indigo-500/60 -ml-0.5">
                                            <path d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PipelineSection;
