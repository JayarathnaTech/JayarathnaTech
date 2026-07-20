import { render, screen } from '@testing-library/react';
import WebDevelopmentSection from '../../components/services/WebDevelopmentSection';

test('WebDevelopmentSection renders section badge', () => {
    render(<WebDevelopmentSection />);
    expect(screen.getByText('Enterprise Web Solutions')).toBeDefined();
});

test('WebDevelopmentSection renders section headline', () => {
    render(<WebDevelopmentSection />);
    expect(screen.getByText('High-Performance Web App Development')).toBeDefined();
});

test('WebDevelopmentSection renders description paragraph', () => {
    render(<WebDevelopmentSection />);
    expect(screen.getByText(/We build enterprise-grade web applications designed/i)).toBeDefined();
});

test('WebDevelopmentSection renders all 4 features', () => {
    render(<WebDevelopmentSection />);
    expect(screen.getByText('Interactive User Interfaces')).toBeDefined();
    expect(screen.getByText('Robust Backend APIs')).toBeDefined();
    expect(screen.getByText('Relational Database Design')).toBeDefined();
    expect(screen.getByText('Server-Side Rendering (SSR)')).toBeDefined();
});

test('WebDevelopmentSection renders all feature descriptions', () => {
    render(<WebDevelopmentSection />);
    expect(screen.getByText(/Component-driven SPAs using React/i)).toBeDefined();
    expect(screen.getByText(/Secure, RESTful and GraphQL APIs/i)).toBeDefined();
    expect(screen.getByText(/Structured, transactional, and indexed data/i)).toBeDefined();
    expect(screen.getByText(/Optimised loading speeds and search engine/i)).toBeDefined();
});

test('WebDevelopmentSection renders code snippet details', () => {
    render(<WebDevelopmentSection />);
    expect(screen.getByText('NextProject')).toBeDefined();
    expect(screen.getByText(/init/i)).toBeDefined();
    expect(screen.getByText(/useFrontend/i)).toBeDefined();
});
