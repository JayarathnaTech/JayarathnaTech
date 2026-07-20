import React from 'react';

const WhyUsSection: React.FC = () => {
    const cards = [
        { num: '01', color: 'text-indigo-400', title: 'Clean Code Architecture', body: 'Adherence to SOLID and DRY programming guidelines ensures our codebases are easily maintainable for decades.', offset: '' },
        { num: '02', color: 'text-purple-400', title: 'Strict QA Pipeline', body: 'Comprehensive automated unit and integration tests run on every branch push, guaranteeing build health stability.', offset: 'md:mt-6' },
        { num: '03', color: 'text-pink-400', title: 'Modern Stack Focus', body: 'Using the newest, optimized tools like Vite, React Router, TailwindCSS, and ESLint flat configs.', offset: '' },
        { num: '04', color: 'text-cyan-400', title: 'Continuous Delivery', body: 'Automated code compilation and secure deployment pipelines speed up delivery timelines by 40%.', offset: 'md:mt-6' },
    ];

    const checkmarks = [
        'Continuous Integration pipeline ensuring 100% test pass rates',
        'TypeScript compilation checks and strict lint configurations',
        'Blazing fast page loads with sub-second time-to-interactive metric',
    ];

    return (
        <section className="relative py-20 px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Left */}
                    <div className="space-y-6 text-left">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Our Workflow Standard</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Engineered to Perform, Built to Scale
                        </h3>
                        <p className="text-slate-400">
                            We believe in developing products that don't just work, but outperform competition. Our development workflow focuses on strict quality check, type safety, and clean architecture pattern.
                        </p>
                        <ul className="space-y-4">
                            {checkmarks.map((item) => (
                                <li key={item} className="flex items-center space-x-3 text-slate-300">
                                    <span className="shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cards Right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cards.map((card) => (
                            <div
                                key={card.num}
                                className={`bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-sm space-y-3 hover:-translate-y-1 transition-all duration-300 ${card.offset}`}
                            >
                                <div className={`text-2xl font-bold ${card.color}`}>{card.num}</div>
                                <h4 className="text-white font-bold text-lg">{card.title}</h4>
                                <p className="text-slate-400 text-sm">{card.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
