import { render, screen, act } from '@testing-library/react';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';

const mockTestimonialsList = [
    {
        id: '1',
        quote: 'JayarathnaTech delivered our scalable microservices dashboard in record time. The code structure is incredibly clean, and our system load times dropped by over 60%.',
        name: 'Alex Mercer',
        role: 'VP of Engineering, Innovate Labs',
        initials: 'AM',
        location: 'New York, USA',
        avatarGradient: 'from-indigo-500 to-purple-500',
        rating: 5,
    },
    {
        id: '2',
        quote: 'Integrating complex AI reasoning features and semantic vector databases was a breeze with their team. Their engineering depth in modern neural networks is top-tier.',
        name: 'Sophia Kael',
        role: 'Head of Product, NeuraFlow',
        initials: 'SK',
        location: 'Munich, Germany',
        avatarGradient: 'from-purple-500 to-pink-500',
        rating: 5,
    },
    {
        id: '3',
        quote: 'The DevOps and Kubernetes orchestration designed by JayarathnaTech resolved our persistent downtime issues. Scale-out is now completely automated and painless.',
        name: 'Ryutaro Tanaka',
        role: 'Founder, CyberGrid Co.',
        initials: 'RT',
        location: 'Tokyo, Japan',
        avatarGradient: 'from-cyan-500 to-indigo-500',
        rating: 5,
    }
];

// Mock firestore queries to return mocked testimonials during tests
vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    getDocs: vi.fn(() => Promise.resolve({
        forEach: (callback: any) => {
            mockTestimonialsList.forEach((t) => {
                callback({
                    id: t.id,
                    data: () => ({
                        quote: t.quote,
                        name: t.name,
                        role: t.role,
                        initials: t.initials,
                        location: t.location,
                        avatarGradient: t.avatarGradient,
                        rating: t.rating
                    })
                });
            });
        }
    }))
}));

const renderTestimonials = async () => {
    let result;
    await act(async () => {
        result = render(
            <BrowserRouter>
                <TestimonialsSection />
            </BrowserRouter>
        );
    });
    return result;
};

test('TestimonialsSection renders section heading', async () => {
    await renderTestimonials();
    expect(screen.getByText('Global Client Reviews')).toBeDefined();
    expect(screen.getByText('Trusted by Leaders Worldwide')).toBeDefined();
});

test('TestimonialsSection renders all 3 client names', async () => {
    await renderTestimonials();
    expect(screen.getByText('Alex Mercer')).toBeDefined();
    expect(screen.getByText('Sophia Kael')).toBeDefined();
    expect(screen.getByText('Ryutaro Tanaka')).toBeDefined();
});

test('TestimonialsSection renders all client roles', async () => {
    await renderTestimonials();
    expect(screen.getByText('VP of Engineering, Innovate Labs')).toBeDefined();
    expect(screen.getByText('Head of Product, NeuraFlow')).toBeDefined();
    expect(screen.getByText('Founder, CyberGrid Co.')).toBeDefined();
});

test('TestimonialsSection renders all client locations', async () => {
    await renderTestimonials();
    expect(screen.getByText('New York, USA')).toBeDefined();
    expect(screen.getByText('Munich, Germany')).toBeDefined();
    expect(screen.getByText('Tokyo, Japan')).toBeDefined();
});

test('TestimonialsSection renders all client initials avatars', async () => {
    await renderTestimonials();
    expect(screen.getByText('AM')).toBeDefined();
    expect(screen.getByText('SK')).toBeDefined();
    expect(screen.getByText('RT')).toBeDefined();
});

test('TestimonialsSection renders testimonial quote excerpts', async () => {
    await renderTestimonials();
    expect(screen.getByText(/load times dropped by over 60%/i)).toBeDefined();
    expect(screen.getByText(/neural networks is top-tier/i)).toBeDefined();
    expect(screen.getByText(/completely automated and painless/i)).toBeDefined();
});
