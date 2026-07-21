import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

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

const CATEGORIES = ['Web App', 'Mobile', 'Cloud', 'AI/ML', 'Other'];

// Compress uploaded image file to lightweight WebP/JPEG Base64 string
const compressImage = (file: File, maxWidth = 800, quality = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context unavailable'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);
                // Convert canvas to optimized JPEG data URL
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};

const ProjectManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [processingImage, setProcessingImage] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [techInput, setTechInput] = useState('');
    const [category, setCategory] = useState('Web App');
    const [featured, setFeatured] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchProjects = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            let snapshot;
            try {
                const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
                snapshot = await getDocs(q);
            } catch (queryErr) {
                // Fallback to simple collection fetch without orderBy
                snapshot = await getDocs(collection(db, 'projects'));
            }

            const loaded: Project[] = [];
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loaded.push({
                    id: docSnap.id,
                    title: data.title || '',
                    description: data.description || '',
                    imageUrl: data.imageUrl || '',
                    projectUrl: data.projectUrl || '',
                    techStack: Array.isArray(data.techStack) ? data.techStack : [],
                    category: data.category || 'Web App',
                    featured: !!data.featured,
                    createdAt: data.createdAt || 0,
                } as any);
            });

            // Sort in memory by createdAt descending
            loaded.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));

            setProjects(loaded);
        } catch (err: any) {
            console.error('Error fetching projects:', err);
            setErrorMessage(
                'Failed to load projects from database. Please ensure your Firestore Security Rules allow read/write access to the "projects" collection.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImageUrl('');
        setProjectUrl('');
        setTechInput('');
        setCategory('Web App');
        setFeatured(false);
        setEditingId(null);
        setShowForm(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleEdit = (p: Project) => {
        setEditingId(p.id);
        setTitle(p.title);
        setDescription(p.description);
        setImageUrl(p.imageUrl);
        setProjectUrl(p.projectUrl);
        setTechInput(p.techStack.join(', '));
        setCategory(p.category || 'Web App');
        setFeatured(p.featured);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProcessingImage(true);
        setErrorMessage('');

        try {
            const compressed = await compressImage(file, 800, 0.82);
            setImageUrl(compressed);
            setSuccessMessage('Image processed & compressed successfully (Free Storage)!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Image compression failed:', err);
            setErrorMessage('Failed to process image file. Try pasting a direct Image URL instead.');
        } finally {
            setProcessingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!title.trim()) {
            setErrorMessage('Project title is required.');
            return;
        }
        if (!description.trim()) {
            setErrorMessage('Project description is required.');
            return;
        }

        setSaving(true);
        const techStack = techInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const projectData = {
            title: title.trim(),
            description: description.trim(),
            imageUrl: imageUrl.trim(),
            projectUrl: projectUrl.trim(),
            techStack,
            category,
            featured,
            updatedAt: Date.now(),
        };

        try {
            if (editingId) {
                await updateDoc(doc(db, 'projects', editingId), projectData);
                setSuccessMessage('Project updated successfully!');
            } else {
                await addDoc(collection(db, 'projects'), {
                    ...projectData,
                    createdAt: Date.now(),
                });
                setSuccessMessage('Project created successfully!');
            }
            fetchProjects();
            resetForm();
        } catch (err: any) {
            console.error('Error saving project:', err);
            setErrorMessage(err.message || 'Failed to save project.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string, projectTitle: string) => {
        if (!window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) return;
        try {
            await deleteDoc(doc(db, 'projects', id));
            setProjects((prev) => prev.filter((p) => p.id !== id));
            setSuccessMessage('Project deleted.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project.');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header & Add Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                        Portfolio Projects Manager
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">Manage showcased client projects, descriptions, images, and live URLs.</p>
                </div>
                <button
                    onClick={() => {
                        if (showForm) resetForm();
                        else setShowForm(true);
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2 w-fit"
                >
                    {showForm ? 'Cancel' : '+ Add New Project'}
                </button>
            </div>

            {/* Notification messages */}
            {successMessage && (
                <div className="p-4 rounded-xl text-xs font-bold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="p-4 rounded-xl text-xs font-bold border bg-rose-500/10 border-rose-500/20 text-rose-400">
                    {errorMessage}
                </div>
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6 backdrop-blur-md">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h3 className="text-lg font-bold text-white">
                            {editingId ? 'Edit Project' : 'Add New Showcase Project'}
                        </h3>
                        <button type="button" onClick={resetForm} className="text-slate-500 hover:text-white text-xs">✕ Close</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Project Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Fintech Mobile App"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Project Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Describe the application architecture, client problem solved, and key features..."
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project Live URL */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Live URL / Demo Link</label>
                            <input
                                type="url"
                                value={projectUrl}
                                onChange={(e) => setProjectUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder="React, Node.js, Firebase, Tailwind"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Free Image Source Options */}
                    <div className="space-y-3 bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400">Project Thumbnail Image</label>
                            <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                100% Free Option
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            {/* Free Option 1: Client-side Image Upload */}
                            <div className="space-y-1">
                                <span className="text-xs text-slate-400">Upload Image File (Auto-Compressed):</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={processingImage}
                                    className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
                                />
                                {processingImage && (
                                    <span className="text-[10px] text-indigo-400 font-medium animate-pulse">Compressing image...</span>
                                )}
                            </div>

                            {/* Free Option 2: Image URL */}
                            <div className="space-y-1">
                                <span className="text-xs text-slate-400">Or Paste Image URL (Unsplash, ImgBB, etc.):</span>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Image Preview */}
                        {imageUrl && (
                            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-900">
                                <div className="flex items-center gap-3">
                                    <img src={imageUrl} alt="Preview" className="h-16 w-28 object-cover rounded-lg border border-slate-700" />
                                    <span className="text-xs text-emerald-400 font-semibold">✓ Image Ready</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setImageUrl('')}
                                    className="text-xs text-rose-400 hover:text-rose-300 font-bold"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Featured toggle */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="featuredCheck"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-slate-950 cursor-pointer"
                        />
                        <label htmlFor="featuredCheck" className="text-xs text-slate-300 font-bold cursor-pointer">
                            Mark as Featured Project (Highlighted on top of portfolio page)
                        </label>
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving || processingImage}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                            {saving ? 'Saving Project...' : editingId ? 'Update Project' : 'Publish Project'}
                        </button>
                    </div>
                </form>
            )}

            {/* Projects List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="py-12 text-center text-slate-500 text-sm">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm space-y-2">
                        <p>No projects published yet.</p>
                        <p className="text-xs text-slate-600">Click "+ Add New Project" above to create your first portfolio entry.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((p) => (
                            <div key={p.id} className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
                                <div className="space-y-3">
                                    {p.imageUrl && (
                                        <img src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover rounded-xl border border-slate-800" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-white font-bold text-base">{p.title}</h4>
                                        {p.featured && (
                                            <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-indigo-600 text-white">Featured</span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-xs line-clamp-2">{p.description}</p>
                                    {p.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {p.techStack.map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 text-[9px] rounded bg-slate-800 text-indigo-300 font-semibold">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">{p.category}</span>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id, p.title)}
                                            className="px-3 py-1.5 bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600 hover:text-white text-rose-400 text-xs font-bold rounded-lg transition-all cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectManager;
