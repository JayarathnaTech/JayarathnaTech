import { render, screen, fireEvent, act } from '@testing-library/react';
import AdminDashboard from '../../pages/AdminDashboard';
import { BrowserRouter } from 'react-router';
import { vi, expect, test, beforeEach } from 'vitest';

const mockSignIn = vi.fn();
const mockSignOut = vi.fn();
let mockAuthStateChangedCallback: any = null;

vi.mock('firebase/auth', async () => {
    const actual = await vi.importActual<typeof import('firebase/auth')>('firebase/auth');
    return {
        ...actual,
        getAuth: vi.fn(),
        GoogleAuthProvider: class GoogleAuthProviderMock {},
        onAuthStateChanged: vi.fn((_, callback) => {
            mockAuthStateChangedCallback = callback;
            callback(null);
            return vi.fn();
        }),
        signInWithPopup: (a: any, p: any) => mockSignIn(a, p),
        signOut: (a: any) => mockSignOut(a),
    };
});

const mockDeleteDoc = vi.fn();
const mockSetDoc = vi.fn(() => Promise.resolve());

vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    doc: vi.fn((_db: any, _col: string, id: string) => ({ id })),
    deleteDoc: (ref: any) => mockDeleteDoc(ref),
    setDoc: (ref: any, data: any) => mockSetDoc(ref, data),
    getDocs: vi.fn(() => Promise.resolve({
        forEach: (cb: any) => {
            cb({
                id: 'testimonial-id-123',
                data: () => ({
                    quote: 'Outstanding work!',
                    name: 'Sarah Connor',
                    role: 'CTO',
                    initials: 'SC',
                    location: 'LA',
                    avatarGradient: 'from-amber-500 to-rose-500',
                    rating: 5,
                })
            });
        }
    }))
}));

const renderAdminPage = () => render(<BrowserRouter><AdminDashboard /></BrowserRouter>);

beforeEach(() => vi.clearAllMocks());

test('shows login screen when unauthenticated', () => {
    renderAdminPage();
    expect(screen.getByText('Authentication Required')).toBeDefined();
    expect(screen.getByText('Sign in with Google')).toBeDefined();
});

test('clicking sign in calls signInWithPopup', async () => {
    renderAdminPage();
    await act(async () => { fireEvent.click(screen.getByText('Sign in with Google')); });
    expect(mockSignIn).toHaveBeenCalledTimes(1);
});

test('shows Access Denied for non-admin email', async () => {
    renderAdminPage();
    await act(async () => {
        mockAuthStateChangedCallback({ email: 'hacker@evil.com', displayName: 'Hacker' });
    });
    expect(screen.getByText(/Access Denied: hacker@evil.com is not authorized/i)).toBeDefined();
    expect(screen.getByText('Sign Out / Switch Account')).toBeDefined();
});

test('shows admin dashboard for authorized email', async () => {
    renderAdminPage();
    await act(async () => {
        mockAuthStateChangedCallback({ email: 'nidurangajayarathna@gmail.com', displayName: 'Admin' });
    });
    expect(screen.getByText('Admin Dashboard')).toBeDefined();
    expect(screen.getByText('nidurangajayarathna@gmail.com')).toBeDefined();
    expect(screen.getByText('"Outstanding work!"')).toBeDefined();
    expect(screen.getByText('Sarah Connor')).toBeDefined();
});

test('generates invite link and calls setDoc', async () => {
    // Mock crypto.getRandomValues
    vi.stubGlobal('crypto', { getRandomValues: (arr: Uint8Array) => { arr.fill(1); return arr; } });

    renderAdminPage();
    await act(async () => {
        mockAuthStateChangedCallback({ email: 'nidurangajayarathna@gmail.com', displayName: 'Admin' });
    });

    const generateBtn = screen.getByText('Generate New Link');
    await act(async () => { fireEvent.click(generateBtn); });

    expect(mockSetDoc).toHaveBeenCalledTimes(1);
    // After generation, the invite link URL should be visible
    expect(screen.getByText('✓ Active Invite Link')).toBeDefined();

    vi.unstubAllGlobals();
});

test('deletes a testimonial after confirmation', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
    renderAdminPage();
    await act(async () => {
        mockAuthStateChangedCallback({ email: 'nidurangajayarathna@gmail.com', displayName: 'Admin' });
    });
    await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Delete Review' }));
    });
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(mockDeleteDoc).toHaveBeenCalledWith({ id: 'testimonial-id-123' });
    confirmSpy.mockRestore();
});
