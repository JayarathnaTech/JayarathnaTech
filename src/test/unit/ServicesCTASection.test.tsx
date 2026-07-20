import { render, screen } from '@testing-library/react';
import ServicesCTASection from '../../components/services/ServicesCTASection';

test('ServicesCTASection renders headline', () => {
    render(<ServicesCTASection />);
    expect(screen.getByText("Let's Co-create Your Next Platform")).toBeDefined();
});

test('ServicesCTASection renders description paragraph', () => {
    render(<ServicesCTASection />);
    expect(screen.getByText(/Whether you need a web client-facing dashboard/i)).toBeDefined();
});

test('ServicesCTASection renders Discuss Your Project CTA button linking to hello@jayarathnatech.com', () => {
    render(<ServicesCTASection />);
    const link = screen.getByText('Discuss Your Project').closest('a');
    expect(link).toBeDefined();
    expect((link as HTMLAnchorElement).href).toContain('mailto:hello@jayarathnatech.com');
});
