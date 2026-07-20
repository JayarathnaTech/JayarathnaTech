import { render, screen } from '@testing-library/react';
import FooterSection from '../../components/FooterSection';

test('FooterSection renders brand name in copyright', () => {
    render(<FooterSection />);
    expect(screen.getAllByText(/JayarathnaTech/i).length).toBeGreaterThan(0);
});

test('FooterSection renders current year in copyright', () => {
    render(<FooterSection />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeDefined();
});

test('FooterSection renders Privacy Policy link', () => {
    render(<FooterSection />);
    expect(screen.getByText('Privacy Policy')).toBeDefined();
});

test('FooterSection renders Terms of Service link', () => {
    render(<FooterSection />);
    expect(screen.getByText('Terms of Service')).toBeDefined();
});

test('FooterSection renders Contact link', () => {
    render(<FooterSection />);
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toBeDefined();
    expect((contactLink as HTMLAnchorElement).href).toContain('/contact');
});
