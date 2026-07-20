import React from 'react';

const solidPrinciples = [
    { letter: 'S', name: 'Single Responsibility', desc: 'Every module or class has one clear job, making the codebase easy to reason about.' },
    { letter: 'O', name: 'Open / Closed',          desc: 'Entities are open for extension but closed for modification — add features safely.' },
    { letter: 'L', name: 'Liskov Substitution',    desc: 'Subtypes behave correctly in place of their base types — no hidden surprises.' },
    { letter: 'I', name: 'Interface Segregation',  desc: 'Clients depend only on the interfaces they actually use — lean and focused contracts.' },
    { letter: 'D', name: 'Dependency Inversion',   desc: 'High-level modules depend on abstractions, not concrete implementations.' },
];

const SolidSection: React.FC = () => {
    return (
        <section className="relative py-20 px-6 border-t border-slate-900/60 bg-slate-950/30">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Engineering Philosophy</p>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">We Code by SOLID Principles</h3>
                    <p className="text-slate-400">
                        These five object-oriented design principles are the foundation of every system we architect — from small APIs to large-scale microservice platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    {solidPrinciples.map((p) => (
                        <div
                            key={p.letter}
                            className="group relative rounded-2xl border border-slate-900 bg-slate-900/20 p-6 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all duration-300 flex flex-col"
                        >
                            <div className="mb-4 h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <span className="text-2xl font-black text-indigo-400 group-hover:text-indigo-300 transition-colors">{p.letter}</span>
                            </div>
                            <h4 className="text-white font-bold text-base mb-2">{p.name}</h4>
                            <p className="text-slate-400 text-xs leading-relaxed flex-grow">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolidSection;
