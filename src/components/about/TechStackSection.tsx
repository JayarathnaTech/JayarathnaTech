import React from 'react';

const techStack = [
    {
        category: 'Backend',
        color: 'indigo',
        items: [
            {
                name: 'Laravel',
                desc: 'PHP framework for rapid, elegant API and full-stack development.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#FF2D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                )
            },
            {
                name: 'Spring Boot',
                desc: 'Enterprise-grade Java microservices with robust dependency injection.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#6DB33F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 22C2 22 6 18 12 18C18 18 22 22 22 22" />
                        <path d="M12 2C6 8 6 15 12 18C18 15 18 8 12 2Z" />
                        <path d="M12 2V18" />
                    </svg>
                )
            },
        ],
    },
    {
        category: 'Frontend',
        color: 'purple',
        items: [
            {
                name: 'React',
                desc: 'Component-driven SPAs with a focus on performance and reusability.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#61DAFB" strokeWidth="2">
                        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                        <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
                    </svg>
                )
            },
            {
                name: 'Next.js',
                desc: 'SSR and SSG solutions delivering fast, SEO-optimised web experiences.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M16 8l-6 8V8" />
                        <path d="M14 16h2" />
                    </svg>
                )
            },
        ],
    },
    {
        category: 'Database',
        color: 'cyan',
        items: [
            {
                name: 'MySQL',
                desc: 'Reliable, battle-tested relational database powering production workloads.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#00758F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#F29111" />
                        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
                    </svg>
                )
            },
        ],
    },
    {
        category: 'DevOps',
        color: 'pink',
        items: [
            {
                name: 'CI/CD Pipelines',
                desc: 'GitHub Actions workflows enforcing automated testing on every PR.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12A10 10 0 0 0 12 2v4M2 12A10 10 0 0 0 12 22v-4" />
                        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                )
            },
            {
                name: 'Docker',
                desc: 'Containerised, reproducible environments across dev, staging and production.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#2496ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" />
                        <line x1="6" y1="6" x2="6.01" y2="6" />
                        <line x1="10" y1="6" x2="10.01" y2="6" />
                        <line x1="14" y1="6" x2="14.01" y2="6" />
                        <line x1="6" y1="18" x2="6.01" y2="18" />
                        <line x1="10" y1="18" x2="10.01" y2="18" />
                        <line x1="14" y1="18" x2="14.01" y2="18" />
                    </svg>
                )
            },
            {
                name: 'Kubernetes',
                desc: 'Orchestrated, self-healing deployments that scale automatically under load.',
                icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#326CE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l3 11 7 4 7-4 3-11z" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="12" y1="2" x2="12" y2="9" />
                        <line x1="5" y1="18" x2="10" y2="14" />
                        <line x1="19" y1="18" x2="14" y2="14" />
                    </svg>
                )
            },
        ],
    },
];

const colorMap: Record<string, string> = {
    indigo: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
    purple: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
    cyan:   'border-cyan-500/30   bg-cyan-500/5   text-cyan-400',
    pink:   'border-pink-500/30   bg-pink-500/5   text-pink-400',
};

const badgeColor: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
    cyan:   'bg-cyan-500/10   text-cyan-300   border border-cyan-500/20',
    pink:   'bg-pink-500/10   text-pink-300   border border-pink-500/20',
};

const TechStackSection: React.FC = () => {
    return (
        <section className="relative py-20 px-6 border-t border-slate-900/60">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Our Technology Stack</p>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">Built with Battle-Tested Tools</h3>
                    <p className="text-slate-400">
                        We choose our technology deliberately — prioritising reliability, performance, and developer experience across backend, frontend, database, and DevOps layers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {techStack.map((group) => (
                        <div key={group.category} className={`rounded-2xl border p-8 space-y-5 backdrop-blur-sm ${colorMap[group.color]}`}>
                            <div className="flex items-center space-x-3">
                                <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${badgeColor[group.color]}`}>
                                    {group.category}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {group.items.map((tech) => (
                                    <div key={tech.name} className="flex items-start space-x-4">
                                        <div className={`shrink-0 h-9 w-9 rounded-lg flex items-center justify-center border ${colorMap[group.color]}`}>
                                            {tech.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{tech.name}</h4>
                                            <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{tech.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;
