import { render, screen, fireEvent, act } from '@testing-library/react';
import SubmitTestimonial from '../../pages/SubmitTestimonial';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';

const VALID_TOKEN = 'abc123validtoken';
const FUTURE_EXPIRY = Date.now() + 3600000;

vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    addDoc: vi.fn(() => Promise.resolve({ id: 'new-doc-id' })),
    serverTimestamp: vi.fn(() => new Date()),
    doc: vi.fn((_db: any, _col: string, id: string) => ({ id })),
    getDoc: vi.fn((ref: any) => {
        if (ref.id === VALID_TOKEN) {
            return Promise.resolve({
                exists: () => true,
                data: () => ({ expiresAt: FUTURE_EXPIRY, createdAt: Date.now() - 1000 })
            });
        }
        return Promise.resolve({ exists: () => false, data: () => null });
    }),
}));

const renderWithToken = (token: string) => {
    return render(
        <MemoryRouter initialEntries={[`/submit-testimonial/${token}`]}>
            <Routes>
                <Route path="/submit-testimonial/:token" element={<SubmitTestimonial />} />
                <Route path="/" element={<div>Home</div>} />
            </Routes>
        </MemoryRouter>
    );
};

test('shows invalid link page for unknown token', async () => {
    await act(async () => { renderWithToken('totally-bad-token'); });
    expect(screen.getByText('Invalid Link')).toBeDefined();
    expect(screen.getByText(/This link is not valid/i)).toBeDefined();
});

test('renders the form for a valid token', async () => {
    await act(async () => { renderWithToken(VALID_TOKEN); });
    expect(screen.getByText('Leave a')).toBeDefined();
    expect(screen.getByLabelText('Full Name')).toBeDefined();
    expect(screen.getByLabelText('Role & Company')).toBeDefined();
});

test('submitting form sends data to firestore', async () => {
    const { addDoc } = await import('firebase/firestore');

    await act(async () => { renderWithToken(VALID_TOKEN); });

    await act(async () => {
        fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Alex Mercer' } });
        fireEvent.change(screen.getByLabelText('Role & Company'), { target: { value: 'VP of Engineering' } });
        fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'New York, USA' } });
        fireEvent.change(screen.getByLabelText('Your Testimonial / Review'), { target: { value: 'Absolutely outstanding work!' } });
    });

    await act(async () => {
        fireEvent.click(screen.getByText('Submit Testimonial'));
    });

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Thank You!')).toBeDefined();
});
