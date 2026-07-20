import { render, screen } from '@testing-library/react';
import TechStackSection from '../../components/about/TechStackSection';

test('TechStackSection renders section label', () => {
    render(<TechStackSection />);
    expect(screen.getByText('Our Technology Stack')).toBeDefined();
});

test('TechStackSection renders section heading', () => {
    render(<TechStackSection />);
    expect(screen.getByText('Built with Battle-Tested Tools')).toBeDefined();
});

test('TechStackSection renders all 4 category badges', () => {
    render(<TechStackSection />);
    expect(screen.getByText('Backend')).toBeDefined();
    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.getByText('Database')).toBeDefined();
    expect(screen.getByText('DevOps')).toBeDefined();
});

test('TechStackSection renders all technology names', () => {
    render(<TechStackSection />);
    expect(screen.getByText('Laravel')).toBeDefined();
    expect(screen.getByText('Spring Boot')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('Next.js')).toBeDefined();
    expect(screen.getByText('MySQL')).toBeDefined();
    expect(screen.getByText('Docker')).toBeDefined();
    expect(screen.getByText('Kubernetes')).toBeDefined();
    expect(screen.getByText('CI/CD Pipelines')).toBeDefined();
});

test('TechStackSection renders technology descriptions', () => {
    render(<TechStackSection />);
    expect(screen.getByText(/rapid, elegant API/i)).toBeDefined();
    expect(screen.getByText(/dependency injection/i)).toBeDefined();
    expect(screen.getByText(/SSR and SSG solutions/i)).toBeDefined();
    expect(screen.getByText(/relational database/i)).toBeDefined();
    expect(screen.getByText(/self-healing deployments/i)).toBeDefined();
});
