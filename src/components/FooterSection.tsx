import React from 'react';

const FooterSection: React.FC = () => {
    return (
        <footer className="pt-8 pb-4 border-t border-slate-900 bg-slate-950/60 text-slate-400 text-sm backdrop-blur-md relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-6 border-b border-slate-900">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-white font-extrabold text-lg">
                            <span className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-mono shadow-md shadow-indigo-600/30">J</span>
                            <span>JayarathnaTech</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                            High-performance web and mobile application engineering built on SOLID principles, clean architecture, and automated devops pipelines.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {/* LinkedIn SVG Icon */}
                            <a href="https://www.linkedin.com/in/niduranga-jayarathna-1606b21b9/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            {/* GitHub SVG Icon */}
                            <a href="https://github.com/JayarathnaTech" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-indigo-400 transition-colors">About Agency</a></li>
                            <li><a href="/services" className="hover:text-indigo-400 transition-colors">Services</a></li>
                            <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Capabilities Column */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm tracking-wider uppercase">Capabilities</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="/services" className="hover:text-indigo-400 transition-colors">Custom Web Apps</a></li>
                            <li><a href="/services" className="hover:text-indigo-400 transition-colors">Mobile Applications</a></li>
                            <li><a href="/services" className="hover:text-indigo-400 transition-colors">Cloud Architecture</a></li>
                            <li><a href="/services" className="hover:text-indigo-400 transition-colors">UI/UX Design Systems</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm tracking-wider uppercase">Inquiries</h4>
                        <ul className="space-y-2 text-xs text-slate-400">
                            <li className="text-slate-300 font-medium">Email:</li>
                            <li>
                                <a href="mailto:hello@jayarathnatech.com" className="hover:text-indigo-400 transition-colors">
                                    hello@jayarathnatech.com
                                </a>
                            </li>
                            <li className="text-slate-300 font-medium pt-2">Based In:</li>
                            <li>Sri Lanka</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Row */}
                <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div>
                        © {new Date().getFullYear()} JayarathnaTech. All rights reserved. Built with precision and care.
                    </div>
                    <div className="flex space-x-6">
                        <a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
                        <a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
