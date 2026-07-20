import { render, screen } from '@testing-library/react';
import TestimonialsSection from '../../components/home/TestimonialsSection';

test('TestimonialsSection renders section heading', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Global Client Reviews')).toBeDefined();
    expect(screen.getByText('Trusted by Leaders Worldwide')).toBeDefined();
});

test('TestimonialsSection renders all 3 client names', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Alex Mercer')).toBeDefined();
    expect(screen.getByText('Sophia Kael')).toBeDefined();
    expect(screen.getByText('Ryutaro Tanaka')).toBeDefined();
});

test('TestimonialsSection renders all client roles', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('VP of Engineering, Innovate Labs')).toBeDefined();
    expect(screen.getByText('Head of Product, NeuraFlow')).toBeDefined();
    expect(screen.getByText('Founder, CyberGrid Co.')).toBeDefined();
});

test('TestimonialsSection renders all client locations', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('New York, USA')).toBeDefined();
    expect(screen.getByText('Munich, Germany')).toBeDefined();
    expect(screen.getByText('Tokyo, Japan')).toBeDefined();
});

test('TestimonialsSection renders all client initials avatars', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('AM')).toBeDefined();
    expect(screen.getByText('SK')).toBeDefined();
    expect(screen.getByText('RT')).toBeDefined();
});

test('TestimonialsSection renders testimonial quote excerpts', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/load times dropped by over 60%/i)).toBeDefined();
    expect(screen.getByText(/neural networks is top-tier/i)).toBeDefined();
    expect(screen.getByText(/completely automated and painless/i)).toBeDefined();
});
