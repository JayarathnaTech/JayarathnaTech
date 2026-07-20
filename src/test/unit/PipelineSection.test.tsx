import { render, screen } from '@testing-library/react';
import PipelineSection from '../../components/about/PipelineSection';

test('PipelineSection renders section label', () => {
    render(<PipelineSection />);
    expect(screen.getByText('Automation First')).toBeDefined();
});

test('PipelineSection renders section heading', () => {
    render(<PipelineSection />);
    expect(screen.getByText('Our CI/CD Pipeline Flow')).toBeDefined();
});

test('PipelineSection renders all 6 pipeline step labels', () => {
    render(<PipelineSection />);
    expect(screen.getByText('Push / PR')).toBeDefined();
    // '&' in JSX is encoded — use regex to match
    expect(screen.getByText(/Lint.*Type Check/i)).toBeDefined();
    expect(screen.getByText('Automated Tests')).toBeDefined();
    expect(screen.getByText('Docker Build')).toBeDefined();
    expect(screen.getByText('K8s Deploy')).toBeDefined();
    expect(screen.getByText('Live Production')).toBeDefined();
});

test('PipelineSection renders all 6 pipeline step sublabels', () => {
    render(<PipelineSection />);
    // Sublabels are in plain <p> tags but share a Fragment with emoji siblings
    // Use regex to safely match text content without exact-node dependency
    expect(screen.getByText(/^GitHub$/)).toBeDefined();
    expect(screen.getByText(/^ESLint \/ TSC$/)).toBeDefined();
    expect(screen.getByText(/^Vitest \/ JUnit$/)).toBeDefined();
    expect(screen.getByText(/^Container Image$/)).toBeDefined();
    expect(screen.getByText(/^Kubernetes$/)).toBeDefined();
    expect(screen.getByText(/^Zero-Downtime$/)).toBeDefined();
});

test('PipelineSection renders description paragraph', () => {
    render(<PipelineSection />);
    expect(screen.getByText(/shipping confidence, not just code/i)).toBeDefined();
});
