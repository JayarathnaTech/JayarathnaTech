import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { collection, query, orderBy, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, ADMIN_EMAILS } from '../firebase';
import FooterSection from '../components/FooterSection';

interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    initials: string;
    location: string;
    avatarGradient: string;
    rating: number;
}

interface InviteLink {
    token: string;
    url: string;
    expiresAt: number;
}

const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex text-amber-400 space-x-0.5">
        {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.49.882-.49 1.077 0l2.082 5.006 5.404.434c.534.043.748.7.352 1.078l-4.043 3.47 1.082 5.285c.107.52-.451.928-.897.66L12 18.73l-4.626 2.507c-.446.268-1.004-.14-1.08-.66l1.082-5.285-4.043-3.47a.75.75 0 0 1 .416-1.328l5.404-.434 2.082-5.005Z" />
            </svg>
        ))}
    </div>
);

// Generate a cryptographically-random token
const generateToken = (): string => {
    const arr = new Uint8Array(24);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
};

// Format milliseconds remaining as "Xh Ym" countdown
const formatCountdown = (expiresAt: number): string => {
    const diff = expiresAt - Date.now();
    if (diff <= 0) return 'Expired';
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return hrs > 0 ? `${hrs}h ${rem}m remaining` : `${mins}m remaining`;
};

const AdminDashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [testimonialsLoading, setTestimonialsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);

    // Invite link state
    const [inviteLink, setInviteLink] = useState<InviteLink | null>(null);
    const [generatingLink, setGeneratingLink] = useState(false);
    const [copied, setCopied] = useState(false);
    const [, setTick] = useState(0);

    // Tick every 30s to update countdown display
    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && currentUser.email) {
                const hasAdminAccess = ADMIN_EMAILS.includes(currentUser.email.toLowerCase());
                setIsAdmin(hasAdminAccess);
                if (hasAdminAccess) fetchTestimonials();
                else setErrorMessage(`Access Denied: ${currentUser.email} is not authorized as an administrator.`);
            } else {
                setIsAdmin(false);
                setTestimonials([]);
                setInviteLink(null);
                setErrorMessage('');
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchTestimonials = async () => {
        setTestimonialsLoading(true);
        try {
            const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const loaded: Testimonial[] = [];
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loaded.push({
                    id: docSnap.id,
                    quote: data.quote || '',
                    name: data.name || '',
                    role: data.role || '',
                    initials: data.initials || '',
                    location: data.location || '',
                    avatarGradient: data.avatarGradient || 'from-indigo-500 to-purple-500',
                    rating: typeof data.rating === 'number' ? data.rating : 5,
                });
            });
            setTestimonials(loaded);
        } catch (err: any) {
            console.error('Error fetching testimonials:', err);
            setErrorMessage('Failed to load testimonials from Firestore.');
        } finally {
            setTestimonialsLoading(false);
        }
    };

    const handleGenerateLink = async () => {
        setGeneratingLink(true);
        try {
            const token = generateToken();
            const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now

            // Store in Firestore so SubmitTestimonial can validate it
            await setDoc(doc(db, 'inviteTokens', token), {
                createdAt: Date.now(),
                expiresAt,
            });

            const url = `${window.location.origin}/submit-testimonial/${token}`;
            setInviteLink({ token, url, expiresAt });
            setCopied(false);
        } catch (err: any) {
            console.error('Error generating invite link:', err);
            alert('Failed to generate invite link. Check your Firestore rules.');
        } finally {
            setGeneratingLink(false);
        }
    };

    const handleCopy = () => {
        if (!inviteLink) return;
        navigator.clipboard.writeText(inviteLink.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err: any) {
            setErrorMessage(err.message || 'Login failed. Please try again.');
        }
    };

    const handleLogout = async () => {
        setErrorMessage('');
        try { await signOut(auth); } catch { /* ignored */ }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to permanently delete this testimonial?')) return;
        setDeleteInProgress(id);
        try {
            await deleteDoc(doc(db, 'testimonials', id));
            setTestimonials((prev) => prev.filter((t) => t.id !== id));
        } catch {
            alert('Failed to delete testimonial. Please check your Firestore rules.');
        } finally {
            setDeleteInProgress(null);
        }
    };

    // ── Loading ───────────────────────────────────────────────────────────────
    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="flex flex-col items-center space-y-4">
                    <svg className="animate-spin h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-slate-400 font-medium">Verifying Session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden bg-slate-950 min-h-screen flex flex-col justify-between">
            <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/5 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24 relative z-10 flex-grow">
                {!user || !isAdmin ? (
                    /* ── Login / Access Denied ─────────────────────────────── */
                    <div className="max-w-md mx-auto text-center space-y-8 py-16">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest">
                                Admin Portal
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight">Authentication Required</h1>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Please sign in with your Google account to manage client testimonials.
                            </p>
                        </div>
                        {errorMessage && (
                            <div className="p-4 rounded-xl text-xs font-medium border bg-rose-500/10 border-rose-500/20 text-rose-400 break-words">
                                {errorMessage}
                            </div>
                        )}
                        <div className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl shadow-xl backdrop-blur-md space-y-4">
                            {!user ? (
                                <button onClick={handleLogin}
                                    className="w-full py-3.5 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all flex items-center justify-center space-x-3 cursor-pointer">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>
                            ) : (
                                <button onClick={handleLogout}
                                    className="w-full py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer">
                                    Sign Out / Switch Account
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* ── Authenticated Admin Dashboard ─────────────────────── */
                    <div className="space-y-10">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-8">
                            <div className="space-y-1">
                                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Admin Dashboard</h1>
                                <p className="text-slate-500 text-sm">
                                    Signed in as <span className="text-indigo-400 font-semibold">{user.email}</span>
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={fetchTestimonials} disabled={testimonialsLoading}
                                    className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50">
                                    Refresh
                                </button>
                                <button onClick={handleLogout}
                                    className="px-4 py-2 bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 text-rose-400 text-sm font-semibold rounded-xl transition-all cursor-pointer">
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        {/* ── Invite Link Generator ─────────────────────────── */}
                        <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        Generate Client Invite Link
                                    </h2>
                                    <p className="text-slate-500 text-xs leading-relaxed max-w-lg">
                                        Creates a unique, secure URL valid for <span className="text-indigo-400 font-semibold">1 hour</span>. Share it with a selected client so they can submit a testimonial. Anyone without the link cannot access the form.
                                    </p>
                                </div>
                                <button
                                    onClick={handleGenerateLink}
                                    disabled={generatingLink}
                                    className="shrink-0 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                                >
                                    {generatingLink ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            Generate New Link
                                        </>
                                    )}
                                </button>
                            </div>

                            {inviteLink && (
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                            ✓ Active Invite Link
                                        </span>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                                            Date.now() > inviteLink.expiresAt
                                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        }`}>
                                            {formatCountdown(inviteLink.expiresAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-stretch gap-2">
                                        <div className="flex-grow bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 font-mono overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            {inviteLink.url}
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className={`shrink-0 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                                copied
                                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                                    : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                                            }`}
                                        >
                                            {copied ? '✓ Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="text-slate-600 text-[10px]">
                                        Token: <span className="font-mono text-slate-500">{inviteLink.token}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ── Testimonials List ─────────────────────────────── */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-white">
                                Submitted Reviews
                                <span className="ml-2 text-sm font-normal text-slate-500">({testimonials.length})</span>
                            </h2>

                            {testimonialsLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((n) => (
                                        <div key={n} className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 h-32 animate-pulse" />
                                    ))}
                                </div>
                            ) : testimonials.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-slate-900 rounded-3xl bg-slate-900/5 max-w-xl mx-auto space-y-2">
                                    <p className="text-slate-400 font-medium">No testimonials found.</p>
                                    <p className="text-slate-600 text-xs">Generate an invite link above and share it with a client to collect reviews.</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {testimonials.map((t) => (
                                        <div key={t.id}
                                            className="relative rounded-2xl border border-slate-900/80 bg-slate-900/20 p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-slate-800 transition-all duration-300">
                                            <div className="space-y-4 flex-grow min-w-0">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <StarRating count={t.rating} />
                                                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 tracking-wider">
                                                        ID: {t.id}
                                                    </span>
                                                </div>
                                                <p className="text-slate-300 italic text-sm md:text-base leading-relaxed break-words">
                                                    "{t.quote}"
                                                </p>
                                                <div className="flex items-center space-x-4 pt-2">
                                                    <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${t.avatarGradient} flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0`}>
                                                        {t.initials}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-white font-bold text-sm truncate">{t.name}</h4>
                                                        <p className="text-xs text-slate-500 truncate">{t.role} • <span className="text-indigo-400/80 font-medium uppercase tracking-wider text-[9px]">{t.location}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    disabled={deleteInProgress === t.id}
                                                    className="px-5 py-2.5 bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600 hover:text-white hover:border-rose-600 text-rose-400 text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2">
                                                    {deleteInProgress === t.id ? (
                                                        <>
                                                            <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                            <span>Deleting...</span>
                                                        </>
                                                    ) : (
                                                        <span>Delete Review</span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <FooterSection />
        </div>
    );
};

export default AdminDashboard;
