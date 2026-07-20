import React from 'react';

const techStack = [
    {
        category: 'Backend',
        color: 'indigo',
        items: [
            { name: 'Laravel',     desc: 'PHP framework for rapid, elegant API and full-stack development.' },
            { name: 'Spring Boot', desc: 'Enterprise-grade Java microservices with robust dependency injection.' },
        ],
    },
    {
        category: 'Frontend',
        color: 'purple',
        items: [
            { name: 'React',   desc: 'Component-driven SPAs with a focus on performance and reusability.' },
            { name: 'Next.js', desc: 'SSR and SSG solutions delivering fast, SEO-optimised web experiences.' },
        ],
    },
    {
        category: 'Database',
        color: 'cyan',
        items: [
            { name: 'MySQL', desc: 'Reliable, battle-tested relational database powering production workloads.' },
        ],
    },
    {
        category: 'DevOps',
        color: 'pink',
        items: [
            { name: 'CI/CD Pipelines', desc: 'GitHub Actions workflows enforcing automated testing on every PR.' },
            { name: 'Docker',          desc: 'Containerised, reproducible environments across dev, staging and production.' },
            { name: 'Kubernetes',      desc: 'Orchestrated, self-healing deployments that scale automatically under load.' },
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
                                        <div className={`shrink-0 h-9 w-9 rounded-lg flex items-center justify-center text-lg font-black border ${colorMap[group.color]}`}>
                                            {tech.name[0]}
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
