import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../../components/ScrollToTop';
import { MemoryRouter } from 'react-router';

test('ScrollToTop renders button hidden initially when window.scrollY <= 300', () => {
    render(
        <MemoryRouter>
            <ScrollToTop />
        </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeDefined();
    expect(button.className).toContain('opacity-0');
});

test('ScrollToTop becomes visible when scrolled down past 300px', () => {
    render(
        <MemoryRouter>
            <ScrollToTop />
        </MemoryRouter>
    );

    window.scrollY = 400;
    fireEvent.scroll(window);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button.className).toContain('opacity-100');
});

test('clicking ScrollToTop triggers window.scrollTo', () => {
    window.scrollTo = vi.fn();

    render(
        <MemoryRouter>
            <ScrollToTop />
        </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
    });
});
