import { render, screen } from '@testing-library/react';
import SolidSection from '../../components/about/SolidSection';

test('SolidSection renders section label', () => {
    render(<SolidSection />);
    expect(screen.getByText('Engineering Philosophy')).toBeDefined();
});

test('SolidSection renders section heading', () => {
    render(<SolidSection />);
    expect(screen.getByText('We Code by SOLID Principles')).toBeDefined();
});

test('SolidSection renders all 5 principle letter badges', () => {
    render(<SolidSection />);
    ['S', 'O', 'L', 'I', 'D'].forEach(letter => {
        expect(screen.getByText(letter)).toBeDefined();
    });
});

test('SolidSection renders all 5 principle names', () => {
    render(<SolidSection />);
    expect(screen.getByText('Single Responsibility')).toBeDefined();
    expect(screen.getByText('Open / Closed')).toBeDefined();
    expect(screen.getByText('Liskov Substitution')).toBeDefined();
    expect(screen.getByText('Interface Segregation')).toBeDefined();
    expect(screen.getByText('Dependency Inversion')).toBeDefined();
});

test('SolidSection renders all 5 principle descriptions', () => {
    render(<SolidSection />);
    expect(screen.getByText(/one clear job/i)).toBeDefined();
    expect(screen.getByText(/open for extension/i)).toBeDefined();
    expect(screen.getByText(/Subtypes behave correctly/i)).toBeDefined();
    expect(screen.getByText(/lean and focused contracts/i)).toBeDefined();
    expect(screen.getByText(/depend on abstractions/i)).toBeDefined();
});
