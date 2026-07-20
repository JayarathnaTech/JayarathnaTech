import { render, screen } from '@testing-library/react';
import MobileDevelopmentSection from '../../components/services/MobileDevelopmentSection';

test('MobileDevelopmentSection renders section badge', () => {
    render(<MobileDevelopmentSection />);
    expect(screen.getByText('Mobile First Design')).toBeDefined();
});

test('MobileDevelopmentSection renders section headline', () => {
    render(<MobileDevelopmentSection />);
    expect(screen.getByText('Native-Grade Mobile App Development')).toBeDefined();
});

test('MobileDevelopmentSection renders description paragraph', () => {
    render(<MobileDevelopmentSection />);
    expect(screen.getByText(/We build intuitive mobile applications tailored to capture/i)).toBeDefined();
});

test('MobileDevelopmentSection renders all 4 features', () => {
    render(<MobileDevelopmentSection />);
    expect(screen.getByText('Cross-Platform Excellence')).toBeDefined();
    expect(screen.getByText('Offline-First Architectures')).toBeDefined();
    expect(screen.getByText('Push Notifications')).toBeDefined();
    expect(screen.getByText('Smooth Gestures & Animations')).toBeDefined();
});

test('MobileDevelopmentSection renders all feature descriptions', () => {
    render(<MobileDevelopmentSection />);
    expect(screen.getByText(/Performant mobile apps running smoothly/i)).toBeDefined();
    expect(screen.getByText(/Robust client-side databases ensuring/i)).toBeDefined();
    expect(screen.getByText(/Real-time user engagement systems/i)).toBeDefined();
    expect(screen.getByText(/Rich micro-interactions and smooth/i)).toBeDefined();
});

test('MobileDevelopmentSection renders mockup mobile container details', () => {
    render(<MobileDevelopmentSection />);
    expect(screen.getByText('Mobile App Engine')).toBeDefined();
    expect(screen.getByText('Status: Connected')).toBeDefined();
});
