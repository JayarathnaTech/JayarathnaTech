import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import FooterSection from '../components/FooterSection';

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    techStack: string[];
    category: string;
    featured: boolean;
}

/* ─── icons ────────────────────────────────────────────────── */
const IconExternal: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="2" stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const IconMaximize: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="2" stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

/* ─── Project Card ──────────────────────────────────────────── */
const ProjectCard: React.FC<{ project: Project; onSelect: (p: Project) => void }> = ({ project, onSelect }) => (
    <div
        onClick={() => onSelect(project)}
        className="group relative rounded-2xl border border-slate-800/60 bg-slate-900/30 overflow-hidden
                   hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1
                   hover:shadow-2xl hover:shadow-indigo-950/50 backdrop-blur-sm flex flex-col cursor-pointer"
    >
        {/* thumbnail */}
        <div className="relative overflow-hidden h-52 bg-slate-900">
            {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1" stroke="currentColor" className="w-16 h-16 text-slate-700">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5
                               1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0
                               1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0
                               1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0
                               .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
            )}
            {project.featured && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black
                                 uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
                    ★ Featured
                </span>
            )}
            {project.category && (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold
                                 uppercase tracking-wider bg-slate-900/80 border border-slate-700/60
                                 text-slate-300 backdrop-blur-sm">
                    {project.category}
                </span>
            )}
        </div>

        {/* body */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
            <div className="space-y-2 flex-grow">
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-indigo-300 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                </p>
            </div>

            {project.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-semibold rounded
                                                 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                            {t}
                        </span>
                    ))}
                </div>
            )}

            <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    View Full Details →
                </span>
                {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white
                                   bg-slate-800/80 hover:bg-indigo-600 px-3 py-1.5 rounded-lg border
                                   border-slate-700 hover:border-indigo-600 transition-all">
                        <IconExternal /> Live Demo
                    </a>
                )}
            </div>
        </div>
    </div>
);

/* ─── Fullscreen Lightbox ───────────────────────────────────── */
const Lightbox: React.FC<{ src: string; title: string; onClose: () => void }> = ({ src, title, onClose }) =>
    ReactDOM.createPortal(
        <div
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/97 flex flex-col items-center justify-center p-4"
        >
            <button
                onClick={onClose}
                className="absolute top-5 right-5 h-10 w-10 rounded-full bg-slate-800 hover:bg-indigo-600
                           text-white flex items-center justify-center border border-slate-700 shadow-xl
                           transition-all cursor-pointer text-lg font-bold"
            >
                ✕
            </button>
            <p className="absolute top-5 left-5 text-slate-400 text-sm font-medium truncate max-w-[60vw]">
                {title}
            </p>
            <img
                src={src} alt={title}
                onClick={e => e.stopPropagation()}
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
        </div>,
        document.body
    );

/* ─── Project Detail Modal (rendered via portal at body level) ─ */
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const [lightbox, setLightbox] = useState(false);

    /* lock body scroll & handle Escape */
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') lightbox ? setLightbox(false) : onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose, lightbox]);

    const modal = (
        /* ── Backdrop – rendered straight on body via portal ── */
        <div
            onClick={onClose}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8
                       bg-slate-950/90 backdrop-blur-xl"
        >
            {/* ── Panel ── */}
            <div
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/60
                           rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] flex flex-col
                           overflow-hidden"
                style={{ maxHeight: 'calc(100vh - 48px)' }}
            >

                {/* ── Hero Image ── */}
                {project.imageUrl && (
                    <div className="relative shrink-0 bg-slate-950 overflow-hidden"
                        style={{ height: '300px' }}>
                        <img
                            src={project.imageUrl} alt={project.title}
                            className="w-full h-full object-contain"
                        />
                        {/* gradient overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-20
                                        bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />

                        {/* Fullscreen icon */}
                        <button
                            onClick={() => setLightbox(true)}
                            title="View fullscreen"
                            className="absolute bottom-4 right-4 h-9 w-9 rounded-xl bg-slate-900/80
                                       hover:bg-indigo-600 text-white flex items-center justify-center
                                       border border-slate-700/80 backdrop-blur-md shadow-lg
                                       transition-all cursor-pointer"
                        >
                            <IconMaximize />
                        </button>

                        {/* badges */}
                        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap pointer-events-none">
                            {project.category && (
                                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase
                                                 tracking-wider bg-slate-900/80 border border-slate-700/60
                                                 text-slate-300 backdrop-blur-md">
                                    {project.category}
                                </span>
                            )}
                            {project.featured && (
                                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase
                                                 tracking-widest bg-indigo-600 text-white shadow-lg">
                                    ★ Featured
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Scrollable description ── */}
                <div className="modal-scroll overflow-y-auto flex-grow px-7 py-6 space-y-5">

                    {/* title + tech stack */}
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            {project.title}
                        </h2>
                        {project.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(t => (
                                    <span key={t}
                                        className="px-3 py-1 text-xs font-bold rounded-lg
                                                   bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* description */}
                    <div className="space-y-2 border-t border-slate-800/80 pt-5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-indigo-400">
                            About the Project
                        </p>
                        <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed
                                      whitespace-pre-wrap">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* ── Sticky footer ── */}
                <div className="shrink-0 border-t border-slate-800 bg-slate-900/95
                                px-6 py-4 flex items-center justify-between gap-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200
                                   text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                        Close
                    </button>

                    {project.projectUrl && (
                        <a
                            href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white
                                       text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30
                                       transition-all flex items-center gap-2"
                        >
                            <IconExternal /> Visit Live Project
                        </a>
                    )}
                </div>

                {/* Top-right close X */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-900/80
                               hover:bg-rose-600 text-white flex items-center justify-center
                               border border-slate-700/60 backdrop-blur-md shadow-xl
                               transition-all cursor-pointer z-10 text-sm font-bold"
                >
                    ✕
                </button>
            </div>
        </div>
    );

    return (
        <>
            {ReactDOM.createPortal(modal, document.body)}
            {lightbox && project.imageUrl && (
                <Lightbox src={project.imageUrl} title={project.title} onClose={() => setLightbox(false)} />
            )}
        </>
    );
};

/* ─── Category Filter ───────────────────────────────────────── */
const CATEGORIES = ['All', 'Web App', 'Mobile', 'Cloud', 'AI/ML', 'Other'];

/* ─── Projects Page ─────────────────────────────────────────── */
const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selected, setSelected] = useState<Project | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                let snapshot;
                try {
                    snapshot = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
                } catch {
                    snapshot = await getDocs(collection(db, 'projects'));
                }
                const list: Project[] = [];
                snapshot.forEach(d => {
                    const data = d.data();
                    list.push({
                        id: d.id,
                        title: data.title || '',
                        description: data.description || '',
                        imageUrl: data.imageUrl || '',
                        projectUrl: data.projectUrl || '',
                        techStack: Array.isArray(data.techStack) ? data.techStack : [],
                        category: data.category || '',
                        featured: !!data.featured,
                        createdAt: data.createdAt || 0,
                    } as any);
                });
                list.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
                setProjects(list);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);
    const featured = filtered.filter(p => p.featured);
    const rest     = filtered.filter(p => !p.featured);

    return (
        <div className="relative overflow-hidden bg-slate-950">
            {/* ambient glows */}
            <div className="absolute top-[-5%] right-[-10%] w-[40rem] h-[40rem] rounded-full
                            bg-indigo-900/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[30%] left-[-10%] w-[35rem] h-[35rem] rounded-full
                            bg-fuchsia-900/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                {/* ── Hero ── */}
                <section className="pt-20 pb-16 px-6 text-center">
                    <div className="container mx-auto max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                        bg-indigo-500/10 border border-indigo-500/30 text-indigo-300
                                        text-xs font-bold uppercase tracking-widest">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            Our Work
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            Engineered with{' '}
                            <span className="bg-clip-text text-transparent
                                             bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Precision
                            </span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            A curated showcase of high-performance applications built with clean architecture,
                            scalable infrastructure, and engineering excellence.
                        </p>

                        {/* filter pills */}
                        <div className="flex flex-wrap gap-2 justify-center pt-4">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
                                                duration-200 border cursor-pointer ${
                                        activeCategory === cat
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40'
                                    }`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Grid ── */}
                <section className="px-6 pb-24">
                    <div className="container mx-auto max-w-6xl">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(n => (
                                    <div key={n} className="rounded-2xl border border-slate-800/40
                                                            bg-slate-900/20 h-72 animate-pulse" />
                                ))}
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-slate-800
                                            rounded-3xl max-w-lg mx-auto space-y-3">
                                <div className="text-5xl">🚀</div>
                                <p className="text-white font-bold text-lg">Projects coming soon</p>
                                <p className="text-slate-500 text-sm">We're building amazing things. Check back shortly.</p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {featured.length > 0 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">
                                                Featured
                                            </span>
                                            <div className="flex-grow h-px bg-slate-800" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {featured.map(p => (
                                                <ProjectCard key={p.id} project={p} onSelect={setSelected} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {rest.length > 0 && (
                                    <div className="space-y-6">
                                        {featured.length > 0 && (
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                                                    All Projects
                                                </span>
                                                <div className="flex-grow h-px bg-slate-800" />
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {rest.map(p => (
                                                <ProjectCard key={p.id} project={p} onSelect={setSelected} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                <FooterSection />
            </div>

            {/* Modal – mounted via portal so no stacking context issue */}
            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default Projects;
