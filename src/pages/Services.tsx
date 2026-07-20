import React from 'react';
import ServicesHeroSection from '../components/services/ServicesHeroSection';
import WebDevelopmentSection from '../components/services/WebDevelopmentSection';
import MobileDevelopmentSection from '../components/services/MobileDevelopmentSection';
import ServicesProcessSection from '../components/services/ServicesProcessSection';
import ServicesCTASection from '../components/services/ServicesCTASection';
import FooterSection from '../components/FooterSection';

const Services: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-slate-950 pb-24">
            {/* Background Glows */}
            <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none"></div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

            {/* Orchestrated Sections */}
            <ServicesHeroSection />
            <WebDevelopmentSection />
            <MobileDevelopmentSection />
            <ServicesProcessSection />
            <ServicesCTASection />
            <FooterSection />
        </div>
    );
};

export default Services;
