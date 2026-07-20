import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ContactForm from '../../components/contact/ContactForm';

const fetchSpy = vi.spyOn(globalThis, 'fetch');

// Helper to mock successful fetch
const mockFetchSuccess = () => {
    fetchSpy.mockResolvedValue({
        json: async () => ({ success: true }),
    } as Response);
};

// Helper to mock failed fetch
const mockFetchFailure = (msg?: string) => {
    fetchSpy.mockResolvedValue({
        json: async () => ({ success: false, message: msg || 'Failed to submit' }),
    } as Response);
};

// Helper to mock network error
const mockFetchNetworkError = () => {
    fetchSpy.mockRejectedValue(new Error('Network Error'));
};

test('ContactForm renders form fields and labels', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByLabelText(/Interested Service/i)).toBeDefined();
    expect(screen.getByLabelText(/Your Message/i)).toBeDefined();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeDefined();
});

test('ContactForm submits successfully with Web3Forms API', async () => {
    mockFetchSuccess();
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Niduranga Jayarathna' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'niduranga@example.com' } });
    fireEvent.change(screen.getByLabelText(/Interested Service/i), { target: { value: 'Mobile Application' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hello, looking for mobile application development services.' } });

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    // Check loading indicator shows up
    expect(screen.getByText('Sending...')).toBeDefined();

    await waitFor(() => {
        expect(screen.getByText(/Thank you! Your message has been sent successfully/i)).toBeDefined();
    });

    expect(fetchSpy).toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.any(Object));
});

test('ContactForm shows error on submission failure', async () => {
    mockFetchFailure('Invalid Key');
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Short Message' } });

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
        expect(screen.getByText(/Invalid Key/i)).toBeDefined();
    });
});

test('ContactForm shows error on network failure', async () => {
    mockFetchNetworkError();
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Short Message' } });

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
        expect(screen.getByText(/Network error. Please check your connection/i)).toBeDefined();
    });
});
