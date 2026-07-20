import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useParams } from 'react-router';
import FooterSection from '../components/FooterSection';

const GRADIENTS = [
    { name: 'Indigo Aura', value: 'from-indigo-500 to-purple-500' },
    { name: 'Sunset Spark', value: 'from-amber-500 to-rose-500' },
    { name: 'Neon Fusion', value: 'from-purple-500 to-pink-500' },
    { name: 'Ocean Flow', value: 'from-cyan-500 to-indigo-500' },
    { name: 'Emerald Wave', value: 'from-emerald-500 to-teal-500' },
    { name: 'Cyberpunk', value: 'from-fuchsia-500 to-cyan-500' },
];

const SubmitTestimonial: React.FC = () => {
    const { token } = useParams<{ token: string }>();

    // Token validation state
    const [tokenStatus, setTokenStatus] = useState<'checking' | 'valid' | 'invalid' | 'expired'>('checking');

    // Form state
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [quote, setQuote] = useState('');
    const [avatarGradient, setAvatarGradient] = useState(GRADIENTS[0].value);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setTokenStatus('invalid');
                return;
            }
            try {
                const tokenDoc = await getDoc(doc(db, 'inviteTokens', token));
                if (!tokenDoc.exists()) {
                    setTokenStatus('invalid');
                    return;
                }
                const data = tokenDoc.data();
                const expiresAt: number = data.expiresAt;
                if (Date.now() > expiresAt) {
                    setTokenStatus('expired');
                } else {
                    setTokenStatus('valid');
                }
            } catch {
                setTokenStatus('invalid');
            }
        };
        validateToken();
    }, [token]);

    const getInitials = (fullName: string) => {
        if (!fullName) return 'YT';
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const timeoutPromise = (ms: number, message: string) => {
        return new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error(message)), ms);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !role || !location || !quote) {
            setStatus('error');
            setErrorMessage('All fields are required.');
            return;
        }
        setStatus('submitting');
        try {
            const initials = getInitials(name);
            const saveOperation = addDoc(collection(db, 'testimonials'), {
                name, role, location, rating, quote, avatarGradient, initials,
                createdAt: serverTimestamp()
            });
            await Promise.race([
                saveOperation,
                timeoutPromise(10000, 'Firestore request timed out. Please check your connection.')
            ]);
            setStatus('success');
            setName(''); setRole(''); setLocation(''); setRating(5); setQuote('');
            setAvatarGradient(GRADIENTS[0].value);
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to submit testimonial. Please try again.');
        }
    };

    // ── Token checking state ──────────────────────────────────────────────────
    if (tokenStatus === 'checking') {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <svg className="animate-spin h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-slate-400 font-medium text-sm">Verifying your invite link...</p>
                </div>
            </div>
        );
    }

    // ── Invalid or expired token ──────────────────────────────────────────────
    if (tokenStatus === 'invalid' || tokenStatus === 'expired') {
        return (
            <div className="relative overflow-hidden bg-slate-950 min-h-screen flex flex-col justify-between">
                <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-rose-900/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-slate-900/20 blur-[120px] pointer-events-none" />
                <div className="flex-grow flex items-center justify-center px-6">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="mx-auto w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 text-rose-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black text-white">
                                {tokenStatus === 'expired' ? 'Link Expired' : 'Invalid Link'}
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {tokenStatus === 'expired'
                                    ? 'This testimonial invite link has expired (valid for 1 hour). Please request a new link from JayarathnaTech.'
                                    : 'This link is not valid. Please use the invite link shared with you by JayarathnaTech.'
                                }
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-all"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
                <FooterSection />
            </div>
        );
    }

    // ── Valid token — show form ────────────────────────────────────────────────
    return (
        <div className="relative overflow-hidden bg-slate-950 pb-8 min-h-screen flex flex-col justify-between">
            {/* Background Glows */}
            <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

            <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24 relative z-10 flex-grow">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest">
                                Share Your Experience
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                Leave a <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Client Testimonial.
                                </span>
                            </h1>
                            <p className="text-base text-slate-400 leading-relaxed max-w-md">
                                Your feedback helps us continuously refine our products and engineering processes. Thank you for your partnership!
                            </p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
                            {status === 'success' ? (
                                <div className="space-y-6 text-center py-8">
                                    <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                                        <p className="text-slate-400 text-sm">Your testimonial was successfully submitted and will appear on our homepage.</p>
                                    </div>
                                    <div className="pt-4 flex justify-center space-x-4">
                                        <Link to="/" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all">
                                            Go to Home
                                        </Link>
                                        <button onClick={() => setStatus('idle')} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold transition-all cursor-pointer">
                                            Submit Another
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                            <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Alex Mercer"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="role" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role & Company</label>
                                            <input type="text" id="role" required value={role} onChange={(e) => setRole(e.target.value)}
                                                placeholder="e.g. VP of Engineering, Innovate Labs"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label htmlFor="location" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                                            <input type="text" id="location" required value={location} onChange={(e) => setLocation(e.target.value)}
                                                placeholder="e.g. New York, USA"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Rating</label>
                                            <div className="flex items-center space-x-1.5 py-2.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button type="button" key={star} onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoveredRating(star)} onMouseLeave={() => setHoveredRating(null)}
                                                        className="text-amber-400 transition-all focus:outline-none scale-100 hover:scale-125 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                            fill={(hoveredRating !== null ? star <= hoveredRating : star <= rating) ? 'currentColor' : 'none'}
                                                            stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.49.882-.49 1.077 0l2.082 5.006 5.404.434c.534.043.748.7.352 1.078l-4.043 3.47 1.082 5.285c.107.52-.451.928-.897.66L12 18.73l-4.626 2.507c-.446.268-1.004-.14-1.08-.66l1.082-5.285-4.043-3.47a.75.75 0 0 1 .416-1.328l5.404-.434 2.082-5.005Z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avatar Gradient Style</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 py-1">
                                            {GRADIENTS.map((grad) => (
                                                <button type="button" key={grad.name} onClick={() => setAvatarGradient(grad.value)}
                                                    className={`h-10 rounded-xl bg-gradient-to-tr ${grad.value} border-2 transition-all flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer ${
                                                        avatarGradient === grad.value ? 'border-white scale-105 ring-2 ring-indigo-500/50' : 'border-transparent opacity-75 hover:opacity-100'
                                                    }`} title={grad.name}>
                                                    {getInitials(name)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="quote" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Testimonial / Review</label>
                                        <textarea id="quote" required rows={4} value={quote} onChange={(e) => setQuote(e.target.value)}
                                            placeholder="Write your review here..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none" />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 rounded-xl text-xs font-medium border bg-rose-500/10 border-rose-500/20 text-rose-400">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button type="submit" disabled={status === 'submitting'}
                                        className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2 cursor-pointer">
                                        {status === 'submitting' ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <span>Submit Testimonial</span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className="lg:col-span-5 sticky top-28 space-y-6">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live Preview</h3>
                            <p className="text-slate-500 text-xs mt-1">This is how your review card will appear on the homepage.</p>
                        </div>
                        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between min-h-[300px] transition-all duration-300">
                            <div className="space-y-4">
                                <div className="flex text-amber-400 space-x-1">
                                    {[...Array(rating)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]">
                                            <path fillRule="evenodd" d="M10.788 2.903a.75.75 0 0 1 1.424 0l2.082 5.006 5.404.434a.75.75 0 0 1 .416 1.328l-4.043 3.47 1.082 5.285a.75.75 0 0 1-1.127.818L12 16.744l-4.626 2.507a.75.75 0 0 1-1.127-.818l1.082-5.285-4.043-3.47a.75.75 0 0 1 .416-1.328l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-300 italic text-sm md:text-base leading-relaxed break-words min-h-[80px]">
                                    "{quote || 'Your review description will be displayed here in real time as you write it.'}"
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center space-x-4">
                                <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${avatarGradient} flex items-center justify-center font-bold text-white shadow-md shrink-0 transition-all duration-300`}>
                                    {getInitials(name)}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-bold text-sm md:text-base truncate">{name || 'Your Name'}</h4>
                                    <p className="text-xs text-slate-500 font-medium truncate">{role || 'Your Role & Company'}</p>
                                    <div className="inline-flex items-center space-x-1 mt-1 text-indigo-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <span className="text-[10px] uppercase font-bold tracking-wider truncate">{location || 'Your Location'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <FooterSection />
        </div>
    );
};

export default SubmitTestimonial;
