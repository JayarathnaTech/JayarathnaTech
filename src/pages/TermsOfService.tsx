import React from 'react';
import FooterSection from '../components/FooterSection';

const TermsOfService: React.FC = () => {
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
                            Terms of Service
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Last Updated: July 20, 2026
                        </p>
                    </div>

                    {/* Glassmorphic Document Content */}
                    <div className="bg-slate-900/40 border border-slate-800/60 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md space-y-8 text-slate-300 leading-relaxed text-sm">
                        
                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">1. Contractual Relationship</h2>
                            <p>
                                By accessing this website or engaging JayarathnaTech for custom software development services, you agree to comply with and be bound by the following Terms of Service. If you do not agree, please do not use our services.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">2. Scope of Services</h2>
                            <p>
                                JayarathnaTech specializes in high-fidelity custom software development, including web development (Next.js, React, Laravel, Spring Boot), mobile application design, cloud infrastructure orchestration (Docker, Kubernetes), and automated CI/CD configurations. Deliverables are specified in individual work proposals.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
                            <p>
                                Unless otherwise agreed in a separate written contract:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-400">
                                <li>Custom code and application architectures built specifically for clients will transfer in ownership upon full settlement of project fees.</li>
                                <li>JayarathnaTech retains ownership of pre-existing templates, core utility libraries, and generalized design frameworks.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">4. Client Responsibilities</h2>
                            <p>
                                Clients are responsible for providing clear project specifications, feedback in a timely manner, and ensuring necessary API access, credentials, or resources needed to proceed with development.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">5. Warranty & Limitation of Liability</h2>
                            <p>
                                We build systems following industry best practices and SOLID design principles. However, all software is delivered "as is" without warranty of any kind, express or implied. Under no circumstances shall JayarathnaTech be liable for any special, incidental, or consequential damages resulting from system downtime or data issues.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-lg font-bold text-white">6. Inquiries</h2>
                            <p>
                                For questions regarding these Terms of Service, please contact:
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

export default TermsOfService;
