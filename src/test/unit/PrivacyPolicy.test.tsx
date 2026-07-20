import { render, screen } from '@testing-library/react';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import { BrowserRouter } from 'react-router';

const renderPrivacyPolicy = () => {
    return render(
        <BrowserRouter>
            <PrivacyPolicy />
        </BrowserRouter>
    );
};

test('PrivacyPolicy page renders main headline', () => {
    renderPrivacyPolicy();
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeDefined();
});

test('PrivacyPolicy page renders section headers', () => {
    renderPrivacyPolicy();
    expect(screen.getByText('1. Introduction')).toBeDefined();
    expect(screen.getByText('2. Information Collection')).toBeDefined();
    expect(screen.getByText('3. How We Use Your Information')).toBeDefined();
    expect(screen.getByText('4. Data Security & Storage')).toBeDefined();
    expect(screen.getByText('5. Third-Party Integrations')).toBeDefined();
    expect(screen.getByText('6. Contact Information')).toBeDefined();
});

test('PrivacyPolicy page renders email link', () => {
    renderPrivacyPolicy();
    const emailLink = screen.getAllByText('hello@jayarathnatech.com')[0].closest('a');
    expect(emailLink).toBeDefined();
    expect((emailLink as HTMLAnchorElement).href).toContain('mailto:hello@jayarathnatech.com');
});
