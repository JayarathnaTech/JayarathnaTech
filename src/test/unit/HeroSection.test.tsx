import { render, screen } from '@testing-library/react';
import HeroSection from '../../components/home/HeroSection';

test('HeroSection renders h1 heading containing agency text', () => {
    render(<HeroSection />);
    // The h1 contains "We Engineer", "Premium Digital", "Experiences" split by <br/> nodes
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('We Engineer');
    expect(heading.textContent).toContain('Premium Digital');
    expect(heading.textContent).toContain('Experiences');
});

test('HeroSection renders gradient span text', () => {
    render(<HeroSection />);
    expect(screen.getByText('Premium Digital')).toBeDefined();
});

test('HeroSection renders CTA buttons', () => {
    render(<HeroSection />);
    expect(screen.getByText('Start Your Project')).toBeDefined();
    expect(screen.getByText('Explore Expertise')).toBeDefined();
});

test('HeroSection Start Your Project links to contact', () => {
    render(<HeroSection />);
    const link = screen.getByText('Start Your Project').closest('a');
    expect((link as HTMLAnchorElement).href).toContain('#contact');
});

test('HeroSection Explore Expertise links to services', () => {
    render(<HeroSection />);
    const link = screen.getByText('Explore Expertise').closest('a');
    expect((link as HTMLAnchorElement).href).toContain('#services');
});

test('HeroSection renders stats bar values', () => {
    render(<HeroSection />);
    expect(screen.getByText('0+')).toBeDefined();
    expect(screen.getByText('99.9%')).toBeDefined();
    expect(screen.getByText('10M+')).toBeDefined();
    expect(screen.getByText('15+')).toBeDefined();
});

test('HeroSection renders stats bar labels', () => {
    render(<HeroSection />);
    expect(screen.getByText('Client Reviews')).toBeDefined();
    expect(screen.getByText('Client Satisfaction')).toBeDefined();
    expect(screen.getByText('Users Impacted')).toBeDefined();
    expect(screen.getByText('Global Tech Experts')).toBeDefined();
});

test('HeroSection renders dashboard mockup image with correct alt text', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('JayarathnaTech Platform Analytics Dashboard');
    expect(img).toBeDefined();
    expect((img as HTMLImageElement).src).toContain('dashboard.png');
});

test('HeroSection renders status badge label', () => {
    render(<HeroSection />);
    expect(screen.getByText('Next-Gen Engineering')).toBeDefined();
});
