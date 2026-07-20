import React from 'react';

interface ServiceCardProps {
    title: string;
    description: string;
    accentClass: string;
    iconPath: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, accentClass, iconPath }) => (
    <div className="group relative rounded-2xl border border-slate-900 bg-slate-900/20 p-8 hover:border-slate-800/80 hover:bg-slate-900/40 transition-all duration-300">
        <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${accentClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                {iconPath}
            </svg>
        </div>
        <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const ServicesSection: React.FC = () => {
    const services = [
        {
            title: 'Custom Web Apps',
            description: 'Highly interactive, search-optimized single-page and server-rendered web applications leveraging React, Vite, and Next.js.',
            accentClass: 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
            iconPath: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />,
        },
        {
            title: 'Cloud Architecture',
            description: 'Resilient DevOps systems utilizing Docker, Kubernetes, AWS, and secure CI/CD pipelines to guarantee high availability and scale.',
            accentClass: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
            iconPath: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.95 17.95 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />,
        },
        {
            title: 'AI Integrations',
            description: 'Integration of customized Large Language Models (LLMs), semantic vector search engines, and intelligent decision systems.',
            accentClass: 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-600 group-hover:text-white',
            iconPath: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.982-8.983m-10.43 3.428-1.283 5.353 7.822-7.822m-7.822 1.83 5.353-1.282m-5.353 1.282-.54 2.252m0 0 4.093-4.093m0 0-1.282 5.353m-2.811-2.544 5.353-1.282" />,
        },
        {
            title: 'UI/UX Design Systems',
            description: 'Premium component design libraries and interactive mockups structured to prioritize optimal user flow and Conversion Optimization.',
            accentClass: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white',
            iconPath: (
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                </>
            ),
        },
    ];

    return (
        <section id="services" className="relative py-20 px-6 border-t border-slate-900/60 bg-slate-950/40">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Our Core Capabilities</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">Specialize in Next-Gen Tech</h3>
                    <p className="text-slate-400 text-base md:text-lg">
                        We design and build clean architectures, modern user interfaces, and robust systems to empower your software products.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
