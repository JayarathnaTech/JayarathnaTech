import { render, screen } from '@testing-library/react';
import FooterSection from '../../components/FooterSection';
import { MemoryRouter } from 'react-router';

test('FooterSection renders brand name in copyright', () => {
    render(
        <MemoryRouter>
            <FooterSection />
        </MemoryRouter>
    );
    expect(screen.getAllByText(/JayarathnaTech/i).length).toBeGreaterThan(0);
});

test('FooterSection renders current year in copyright', () => {
    render(
        <MemoryRouter>
            <FooterSection />
        </MemoryRouter>
    );
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeDefined();
});

test('FooterSection renders Privacy Policy link', () => {
    render(
        <MemoryRouter>
            <FooterSection />
        </MemoryRouter>
    );
    expect(screen.getByText('Privacy Policy')).toBeDefined();
});

test('FooterSection renders Terms of Service link', () => {
    render(
        <MemoryRouter>
            <FooterSection />
        </MemoryRouter>
    );
    expect(screen.getByText('Terms of Service')).toBeDefined();
});

test('FooterSection renders Contact link', () => {
    render(
        <MemoryRouter>
            <FooterSection />
        </MemoryRouter>
    );
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toBeDefined();
    expect((contactLink as HTMLAnchorElement).href).toContain('/contact');
});
