import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyUsSection from '../components/home/WhyUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import FooterSection from '../components/FooterSection.tsx';

const Home: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-slate-950 pb-20">
            <div className="absolute top-[-10%] left-[-10%] w-200 h-200 rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute top-[20%] right-[-10%] w-180 h-180 rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[20%] w-140 h-140 rounded-full bg-cyan-900/10 blur-[100px] pointer-events-none"></div>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

            <HeroSection />
            <ServicesSection />
            <WhyUsSection />
            <TestimonialsSection />
            <CTASection />
            <FooterSection />
        </div>
    );
};

export default Home;