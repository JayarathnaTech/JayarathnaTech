import { render, screen } from '@testing-library/react';
import AboutHeroSection from '../../components/about/AboutHeroSection';

test('AboutHeroSection renders h1 containing company name', () => {
    render(<AboutHeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('JayarathnaTech');
    expect(heading.textContent).toContain('About');
});

test('AboutHeroSection renders status badge text', () => {
    render(<AboutHeroSection />);
    expect(screen.getByText('New Company · Est. 2026')).toBeDefined();
});

test('AboutHeroSection renders description paragraph', () => {
    render(<AboutHeroSection />);
    expect(screen.getByText(/precision-engineering software agency/i)).toBeDefined();
});

test('AboutHeroSection renders gradient span text', () => {
    render(<AboutHeroSection />);
    expect(screen.getByText('JayarathnaTech')).toBeDefined();
});
