import React from 'react';

const checkItems = [
    'Academic foundation in software engineering and system design',
    'Every project follows Test-Driven Development (TDD) practices',
    'Automated CI/CD pipelines on all client repositories',
    'Zero-downtime deployments via Docker & Kubernetes orchestration',
];

const FounderSection: React.FC = () => {
    return (
        <section className="relative py-16 px-6 border-t border-slate-900/60">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Founder Card */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-indigo-600/20 to-purple-600/10 blur-2xl pointer-events-none"></div>
                        <div className="relative rounded-3xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-8 flex flex-col items-center text-center space-y-5 max-w-sm w-full shadow-2xl">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 opacity-40 blur-md"></div>
                                <img
                                    src="/founder.png"
                                    alt="Niduranga Jayarathna — Founder of JayarathnaTech"
                                    className="relative h-36 w-36 rounded-full object-cover border-2 border-slate-700/60 shadow-xl"
                                />
                            </div>

                            {/* Identity */}
                            <div className="space-y-1">
                                <h2 className="text-2xl font-extrabold text-white">Niduranga Jayarathna</h2>
                                <p className="text-indigo-400 font-semibold text-sm">Founder & Principal Engineer</p>
                            </div>

                            {/* Degree Badge */}
                            <div className="inline-flex items-center space-x-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-400 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg>
                                <span className="text-slate-300 text-xs font-semibold">BSc. Hons Software Engineering</span>
                            </div>

                            {/* Tags */}
                            <div className="w-full border-t border-slate-800/60 pt-4 space-y-2 text-left">
                                {['Full-Stack Architect', 'DevOps Practitioner', 'SOLID Principles Advocate'].map(tag => (
                                    <div key={tag} className="flex items-center space-x-2 text-slate-400 text-xs">
                                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block shrink-0"></span>
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Story Text */}
                    <div className="space-y-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Our Story</p>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            Started with a Mission to Engineer Better Software
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            JayarathnaTech was founded by <strong className="text-white">Niduranga Jayarathna</strong>, a BSc. Hons Software Engineering graduate with a deep passion for clean architecture, test-driven development, and automation-first engineering culture.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            As a new company, we are building our reputation on delivering projects that are <strong className="text-white">meticulously crafted</strong> — where every pull request is peer-reviewed, every deployment is automated, and every line of code respects SOLID engineering principles.
                        </p>
                        <ul className="space-y-3 pt-2">
                            {checkItems.map(item => (
                                <li key={item} className="flex items-start space-x-3 text-slate-300 text-sm">
                                    <span className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderSection;
