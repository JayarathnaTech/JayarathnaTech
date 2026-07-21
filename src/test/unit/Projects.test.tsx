import { render, screen } from '@testing-library/react';
import Projects from '../../pages/Projects.tsx';
import { MemoryRouter } from 'react-router';

// Mock Firebase Firestore getDocs and query
vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    getDocs: vi.fn().mockResolvedValue({
        forEach: vi.fn(),
        docs: [],
    }),
}));

test('Projects page renders title and subtitle correctly', () => {
    render(
        <MemoryRouter>
            <Projects />
        </MemoryRouter>
    );

    expect(screen.getByText(/Engineered with/i)).toBeDefined();
    expect(screen.getByText(/Our Work/i)).toBeDefined();
});

test('Projects page renders category filter buttons', () => {
    render(
        <MemoryRouter>
            <Projects />
        </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Web App' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Mobile' })).toBeDefined();
});
