import { render, screen } from '@testing-library/react';
import WhyUsSection from '../../components/home/WhyUsSection';

test('WhyUsSection renders section headings', () => {
    render(<WhyUsSection />);
    expect(screen.getByText('Our Workflow Standard')).toBeDefined();
    expect(screen.getByText('Engineered to Perform, Built to Scale')).toBeDefined();
});

test('WhyUsSection renders all checkmark items', () => {
    render(<WhyUsSection />);
    expect(screen.getByText(/Continuous Integration pipeline/i)).toBeDefined();
    expect(screen.getByText(/TypeScript compilation checks/i)).toBeDefined();
    expect(screen.getByText(/Blazing fast page loads/i)).toBeDefined();
});

test('WhyUsSection renders all 4 numbered philosophy cards', () => {
    render(<WhyUsSection />);
    expect(screen.getByText('01')).toBeDefined();
    expect(screen.getByText('02')).toBeDefined();
    expect(screen.getByText('03')).toBeDefined();
    expect(screen.getByText('04')).toBeDefined();
});

test('WhyUsSection renders card titles', () => {
    render(<WhyUsSection />);
    expect(screen.getByText('Clean Code Architecture')).toBeDefined();
    expect(screen.getByText('Strict QA Pipeline')).toBeDefined();
    expect(screen.getByText('Modern Stack Focus')).toBeDefined();
    expect(screen.getByText('Continuous Delivery')).toBeDefined();
});

test('WhyUsSection renders card descriptions', () => {
    render(<WhyUsSection />);
    expect(screen.getByText(/SOLID and DRY/i)).toBeDefined();
    expect(screen.getByText(/every branch push/i)).toBeDefined();
    expect(screen.getByText(/Vite, React Router/i)).toBeDefined();
    expect(screen.getByText(/delivery timelines by 40%/i)).toBeDefined();
});
