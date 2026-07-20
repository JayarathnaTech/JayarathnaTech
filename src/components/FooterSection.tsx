import React from 'react';

const FooterSection: React.FC = () => {
    return (
        <footer className="pt-16 mt-10 border-t border-slate-900/60 text-slate-500 text-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    © {new Date().getFullYear()} JayarathnaTech. All rights reserved. Built with precision and care.
                </div>
                <div className="flex space-x-6">
                    <a href="#services" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
                    <a href="#services" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
                    <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
