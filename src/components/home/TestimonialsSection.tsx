import React from 'react';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initials: string;
    location: string;
    avatarGradient: string;
    rating: number;
}

const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex text-amber-400 space-x-1">
        {[...Array(count)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]">
                <path fillRule="evenodd" d="M10.788 2.903a.75.75 0 0 1 1.424 0l2.082 5.006 5.404.434a.75.75 0 0 1 .416 1.328l-4.043 3.47 1.082 5.285a.75.75 0 0 1-1.127.818L12 16.744l-4.626 2.507a.75.75 0 0 1-1.127-.818l1.082-5.285-4.043-3.47a.75.75 0 0 1 .416-1.328l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
        ))}
    </div>
);

const LocationPin: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="relative rounded-2xl border border-slate-900 bg-slate-900/30 p-8 backdrop-blur-sm flex flex-col justify-between hover:border-slate-800/80 transition-all duration-300">
        <div className="space-y-4">
            <StarRating count={testimonial.rating} />
            <p className="text-slate-300 italic text-sm md:text-base leading-relaxed">
                "{testimonial.quote}"
            </p>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-900/80 flex items-center space-x-4">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${testimonial.avatarGradient} flex items-center justify-center font-bold text-white shadow-md shrink-0`}>
                {testimonial.initials}
            </div>
            <div>
                <h4 className="text-white font-bold text-sm md:text-base">{testimonial.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{testimonial.role}</p>
                <div className="inline-flex items-center space-x-1 mt-1 text-indigo-400">
                    <LocationPin />
                    <span className="text-[10px] uppercase font-bold tracking-wider">{testimonial.location}</span>
                </div>
            </div>
        </div>
    </div>
);

const testimonialsData: Testimonial[] = [
    {
        quote: 'JayarathnaTech delivered our scalable microservices dashboard in record time. The code structure is incredibly clean, and our system load times dropped by over 60%.',
        name: 'Alex Mercer',
        role: 'VP of Engineering, Innovate Labs',
        initials: 'AM',
        location: 'New York, USA',
        avatarGradient: 'from-indigo-500 to-purple-500',
        rating: 5,
    },
    {
        quote: 'Integrating complex AI reasoning features and semantic vector databases was a breeze with their team. Their engineering depth in modern neural networks is top-tier.',
        name: 'Sophia Kael',
        role: 'Head of Product, NeuraFlow',
        initials: 'SK',
        location: 'Munich, Germany',
        avatarGradient: 'from-purple-500 to-pink-500',
        rating: 5,
    },
    {
        quote: 'The DevOps and Kubernetes orchestration designed by JayarathnaTech resolved our persistent downtime issues. Scale-out is now completely automated and painless.',
        name: 'Ryutaro Tanaka',
        role: 'Founder, CyberGrid Co.',
        initials: 'RT',
        location: 'Tokyo, Japan',
        avatarGradient: 'from-cyan-500 to-indigo-500',
        rating: 5,
    },
];

const TestimonialsSection: React.FC = () => {
    return (
        <section className="relative py-20 px-6 border-t border-slate-900/60 bg-slate-950/20">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Global Client Reviews</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">Trusted by Leaders Worldwide</h3>
                    <p className="text-slate-400 text-base md:text-lg">
                        See what our clients from different regions and companies say about their engineering partnership with JayarathnaTech.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((t) => (
                        <TestimonialCard key={t.name} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
