import { render, screen } from '@testing-library/react';
import AboutCTASection from '../../components/about/AboutCTASection';

test('AboutCTASection renders heading', () => {
    render(<AboutCTASection />);
    expect(screen.getByText('Ready to Build Something Exceptional?')).toBeDefined();
});

test('AboutCTASection renders description paragraph', () => {
    render(<AboutCTASection />);
    expect(screen.getByText(/dedication of a startup/i)).toBeDefined();
});

test('AboutCTASection renders Get in Touch link with correct email href', () => {
    render(<AboutCTASection />);
    const link = screen.getByText('Get in Touch').closest('a');
    expect(link).toBeDefined();
    expect((link as HTMLAnchorElement).href).toContain('mailto:hello@jayarathnatech.com');
});
