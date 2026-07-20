import { render, screen } from '@testing-library/react';
import ServicesHeroSection from '../../components/services/ServicesHeroSection';

test('ServicesHeroSection renders main headline', () => {
    render(<ServicesHeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Engineering Services');
    expect(heading.textContent).toContain('Custom');
});

test('ServicesHeroSection renders status badge', () => {
    render(<ServicesHeroSection />);
    expect(screen.getByText('Our Offerings')).toBeDefined();
});

test('ServicesHeroSection renders description paragraph', () => {
    render(<ServicesHeroSection />);
    expect(screen.getByText(/From enterprise-grade web platforms to performant mobile/i)).toBeDefined();
});
