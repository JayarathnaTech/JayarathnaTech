import { render, screen } from '@testing-library/react';
import FounderSection from '../../components/about/FounderSection';

test('FounderSection renders founder name', () => {
    render(<FounderSection />);
    // Name appears in both the card h2 and the story paragraph <strong>
    expect(screen.getAllByText('Niduranga Jayarathna').length).toBeGreaterThan(0);
});

test('FounderSection renders founder role', () => {
    render(<FounderSection />);
    expect(screen.getByText('Founder & Principal Engineer')).toBeDefined();
});

test('FounderSection renders degree badge', () => {
    render(<FounderSection />);
    expect(screen.getByText('BSc. Hons Software Engineering')).toBeDefined();
});

test('FounderSection renders founder avatar image with correct alt', () => {
    render(<FounderSection />);
    const img = screen.getByAltText('Niduranga Jayarathna — Founder of JayarathnaTech');
    expect(img).toBeDefined();
    expect((img as HTMLImageElement).src).toContain('founder.png');
});

test('FounderSection renders section heading', () => {
    render(<FounderSection />);
    expect(screen.getByText(/Engineer Better Software/i)).toBeDefined();
});

test('FounderSection renders Our Story label', () => {
    render(<FounderSection />);
    expect(screen.getByText('Our Story')).toBeDefined();
});

test('FounderSection renders expertise tags', () => {
    render(<FounderSection />);
    expect(screen.getByText('Full-Stack Architect')).toBeDefined();
    expect(screen.getByText('DevOps Practitioner')).toBeDefined();
    expect(screen.getByText('SOLID Principles Advocate')).toBeDefined();
});

test('FounderSection renders all 4 checkmark items', () => {
    render(<FounderSection />);
    expect(screen.getByText(/Academic foundation in software engineering/i)).toBeDefined();
    // "Test-Driven Development" appears in both a <strong> and an <li> — use getAllByText
    expect(screen.getAllByText(/Test-Driven Development/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CI\/CD pipelines/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Zero-downtime deployments/i)).toBeDefined();
});
