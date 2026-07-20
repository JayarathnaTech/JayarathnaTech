import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface Testimonial {
    id?: string;
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
            <p className="text-slate-300 italic text-sm md:text-base leading-relaxed break-words">
                "{testimonial.quote}"
            </p>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-900/80 flex items-center space-x-4">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${testimonial.avatarGradient} flex items-center justify-center font-bold text-white shadow-md shrink-0`}>
                {testimonial.initials}
            </div>
            <div className="min-w-0">
                <h4 className="text-white font-bold text-sm md:text-base truncate">{testimonial.name}</h4>
                <p className="text-xs text-slate-500 font-medium truncate">{testimonial.role}</p>
                <div className="inline-flex items-center space-x-1 mt-1 text-indigo-400">
                    <LocationPin />
                    <span className="text-[10px] uppercase font-bold tracking-wider truncate">{testimonial.location}</span>
                </div>
            </div>
        </div>
    </div>
);

const TestimonialsSection: React.FC = () => {
    const [firestoreTestimonials, setFirestoreTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
                
                const timeoutPromise = new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error('Fetch timed out')), 5000)
                );

                const querySnapshot = await Promise.race([
                    getDocs(q),
                    timeoutPromise
                ]);

                const loaded: Testimonial[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    loaded.push({
                        id: doc.id,
                        quote: data.quote || '',
                        name: data.name || '',
                        role: data.role || '',
                        initials: data.initials || '',
                        location: data.location || '',
                        avatarGradient: data.avatarGradient || 'from-indigo-500 to-purple-500',
                        rating: typeof data.rating === 'number' ? data.rating : 5,
                    });
                });
                setFirestoreTestimonials(loaded);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

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

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="rounded-2xl border border-slate-900 bg-slate-900/10 p-8 h-64 animate-pulse flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-slate-800 rounded w-full"></div>
                                        <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                                        <div className="h-3 bg-slate-800 rounded w-2/3"></div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-800"></div>
                                    <div className="space-y-2 flex-grow">
                                        <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                        <div className="h-3 bg-slate-800 rounded w-1/3"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : firestoreTestimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {firestoreTestimonials.map((t) => (
                            <TestimonialCard key={t.id} testimonial={t} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border border-dashed border-slate-900 rounded-2xl bg-slate-900/5 max-w-md mx-auto">
                        <p className="text-slate-500 text-sm">No client reviews available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;
