import { render, screen } from '@testing-library/react';
import ServicesProcessSection from '../../components/services/ServicesProcessSection';

test('ServicesProcessSection renders section label', () => {
    render(<ServicesProcessSection />);
    expect(screen.getByText('Our Methodology')).toBeDefined();
});

test('ServicesProcessSection renders section headline', () => {
    render(<ServicesProcessSection />);
    expect(screen.getByText('How We Build Quality Software')).toBeDefined();
});

test('ServicesProcessSection renders all 4 process steps with correct numbers', () => {
    render(<ServicesProcessSection />);
    ['01', '02', '03', '04'].forEach(num => {
        expect(screen.getByText(num)).toBeDefined();
    });
});

test('ServicesProcessSection renders process step titles', () => {
    render(<ServicesProcessSection />);
    expect(screen.getByText('Strategy & Spec')).toBeDefined();
    expect(screen.getByText('Automated Testing')).toBeDefined();
    expect(screen.getByText('Orchestrated Dev')).toBeDefined();
    expect(screen.getByText('Continuous Delivery')).toBeDefined();
});

test('ServicesProcessSection renders process step descriptions', () => {
    render(<ServicesProcessSection />);
    expect(screen.getByText(/Detailed specifications mapping backend contracts/i)).toBeDefined();
    expect(screen.getByText(/Codebase builds accompanied by Vitest/i)).toBeDefined();
    expect(screen.getByText(/Containerised development using Docker/i)).toBeDefined();
    expect(screen.getByText(/Automated pipelines verifying tests on/i)).toBeDefined();
});
