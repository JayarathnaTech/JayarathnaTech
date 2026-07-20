import { render, screen } from '@testing-library/react';
import TermsOfService from '../../pages/TermsOfService';
import { BrowserRouter } from 'react-router';

const renderTermsOfService = () => {
    return render(
        <BrowserRouter>
            <TermsOfService />
        </BrowserRouter>
    );
};

test('TermsOfService page renders main headline', () => {
    renderTermsOfService();
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeDefined();
});

test('TermsOfService page renders section headers', () => {
    renderTermsOfService();
    expect(screen.getByText('1. Contractual Relationship')).toBeDefined();
    expect(screen.getByText('2. Scope of Services')).toBeDefined();
    expect(screen.getByText('3. Intellectual Property')).toBeDefined();
    expect(screen.getByText('4. Client Responsibilities')).toBeDefined();
    expect(screen.getByText('5. Warranty & Limitation of Liability')).toBeDefined();
    expect(screen.getByText('6. Inquiries')).toBeDefined();
});

test('TermsOfService page renders email link', () => {
    renderTermsOfService();
    const emailLink = screen.getAllByText('hello@jayarathnatech.com')[0].closest('a');
    expect(emailLink).toBeDefined();
    expect((emailLink as HTMLAnchorElement).href).toContain('mailto:hello@jayarathnatech.com');
});
