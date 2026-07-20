import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const ACCESS_KEY = "4e85a91b-8c0c-4962-bdd5-0831f28c1b07";

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('Sending message...');

        const formData = new FormData(e.currentTarget);
        // Ensure access_key is appended
        formData.append("access_key", ACCESS_KEY);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMessage('Thank you! Your message has been sent successfully. We will get back to you shortly.');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error. Please check your connection and try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="service" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Interested Service
                </label>
                <select
                    id="service"
                    name="service"
                    defaultValue="Web Application"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                >
                    <option value="Web Application" className="bg-slate-950">Web Application Development</option>
                    <option value="Mobile Application" className="bg-slate-950">Mobile Application Development</option>
                    <option value="DevOps Consultation" className="bg-slate-950">DevOps & Cloud Automation</option>
                    <option value="Other Business" className="bg-slate-950">Other Inquiries</option>
                </select>
            </div>

            <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
                />
            </div>

            {status !== 'idle' && (
                <div
                    className={`p-4 rounded-xl text-xs font-medium border ${
                        status === 'loading'
                            ? 'bg-slate-900/40 border-slate-800 text-indigo-400'
                            : status === 'success'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}
                >
                    {message}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
            >
                {status === 'loading' ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                    </>
                ) : (
                    <span>Send Message</span>
                )}
            </button>
        </form>
    );
};

export default ContactForm;
