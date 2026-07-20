import { render, screen } from '@testing-library/react';
import CTASection from '../../components/home/CTASection';

test('CTASection renders headline', () => {
    render(<CTASection />);
    expect(screen.getByText("Let's Engineer Your Next Venture")).toBeDefined();
});

test('CTASection renders description paragraph', () => {
    render(<CTASection />);
    expect(screen.getByText(/Schedule a call with our principal engineer/i)).toBeDefined();
});

test('CTASection renders Book a Consultation button with correct email href', () => {
    render(<CTASection />);
    const link = screen.getByText('Book a Consultation').closest('a');
    expect(link).toBeDefined();
    expect((link as HTMLAnchorElement).href).toContain('mailto:hello@jayarathnatech.com');
});

test('CTASection renders View Our Work button linking to services', () => {
    render(<CTASection />);
    const link = screen.getByText('View Our Work').closest('a');
    expect(link).toBeDefined();
    expect((link as HTMLAnchorElement).href).toContain('#services');
});
