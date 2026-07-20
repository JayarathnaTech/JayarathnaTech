import React from 'react';
import FooterSection from '../components/FooterSection';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-slate-950 min-h-screen flex flex-col justify-between">
            {/* Background Glows */}
            <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/5 blur-[120px] pointer-events-none"></div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

            <div className="container mx-auto max-w-3xl px-6 py-16 md:py-24 relative z-10 flex-grow">
                <div className="space-y-8">
                    
                    {/* Header */}
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest">
                            Legal & Compliance
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Last Updated: July 20, 2026
                        </p>
                    </div>

                    {/* Glassmorphic Document Content */}
                    <div className="bg-slate-900/40 border border-slate-800/60 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md space-y-8 text-slate-300 leading-relaxed text-sm">
                        
                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
                            <p>
                                Welcome to JayarathnaTech. We are committed to protecting your privacy and ensuring the security of your personal and project-related data. This Privacy Policy explains how we collect, use, and protect information when you visit our website or work with us.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">2. Information Collection</h2>
                            <p>
                                We collect information necessary to deliver software engineering and consulting services. This includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-400">
                                <li>Contact details (name and email address submitted via our contact forms).</li>
                                <li>Project requirements, specifications, and related source materials.</li>
                                <li>Standard website traffic data and basic usage analytics.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">3. How We Use Your Information</h2>
                            <p>
                                Any information collected is utilized exclusively for:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-400">
                                <li>Communicating with you regarding inquiries, proposals, and ongoing project updates.</li>
                                <li>Developing custom software architectures (Next.js, React, Laravel, Spring Boot).</li>
                                <li>Configuring robust deployment files (Docker, Kubernetes) and automated CI/CD pipelines.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">4. Data Security & Storage</h2>
                            <p>
                                We prioritize security. All client databases, credentials, and source codes are stored using encrypted storage mechanisms and secure servers. We apply SOLID principles and strict security practices to eliminate security risks in your applications.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">5. Third-Party Integrations</h2>
                            <p>
                                We integrate with external services such as Web3Forms for secure form delivery and GitHub for code repositories. These partners maintain their own privacy policies governing their platforms.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
                            <p>
                                If you have questions regarding this Privacy Policy, please contact us directly at:
                            </p>
                            <p className="font-bold text-indigo-400">
                                <a href="mailto:hello@jayarathnatech.com" className="hover:underline">hello@jayarathnatech.com</a>
                            </p>
                        </section>

                    </div>

                </div>
            </div>

            <FooterSection />
        </div>
    );
};

export default PrivacyPolicy;
