import React from 'react';
import AboutHeroSection from '../components/about/AboutHeroSection';
import FounderSection from '../components/about/FounderSection';
import SolidSection from '../components/about/SolidSection';
import TechStackSection from '../components/about/TechStackSection';
import PipelineSection from '../components/about/PipelineSection';
import AboutCTASection from '../components/about/AboutCTASection';
import FooterSection from "../components/FooterSection.tsx";

const About: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-slate-950 pb-24">
            <div className="absolute top-[-5%] right-[-10%] w-160 h-160 rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-140 h-140 rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none"></div>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

            <AboutHeroSection />
            <FounderSection />
            <SolidSection />
            <TechStackSection />
            <PipelineSection />
            <AboutCTASection />
            <FooterSection/>
        </div>
    );
};

export default About;
