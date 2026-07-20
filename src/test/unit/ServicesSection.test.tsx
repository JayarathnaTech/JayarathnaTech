import { render, screen } from '@testing-library/react';
import ServicesSection from '../../components/home/ServicesSection';

test('ServicesSection renders section heading', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Our Core Capabilities')).toBeDefined();
    expect(screen.getByText('Specialize in Next-Gen Tech')).toBeDefined();
});

test('ServicesSection renders all 4 service titles', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Custom Web Apps')).toBeDefined();
    expect(screen.getByText('Cloud Architecture')).toBeDefined();
    expect(screen.getByText('Mobile Applications')).toBeDefined();
    expect(screen.getByText('UI/UX Design Systems')).toBeDefined();
});

test('ServicesSection renders service descriptions', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/React, Vite, and Next\.js/i)).toBeDefined();
    expect(screen.getByText(/Docker, Kubernetes, AWS/i)).toBeDefined();
    expect(screen.getByText(/iOS and Android/i)).toBeDefined();
    expect(screen.getByText(/Conversion Optimization/i)).toBeDefined();
});

test('ServicesSection renders exactly 4 service cards', () => {
    render(<ServicesSection />);
    const titles = ['Custom Web Apps', 'Cloud Architecture', 'Mobile Applications', 'UI/UX Design Systems'];
    titles.forEach(title => expect(screen.getByText(title)).toBeDefined());
});
