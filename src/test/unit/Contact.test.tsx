import { render, screen } from '@testing-library/react';
import Contact from '../../pages/Contact';
import { BrowserRouter } from 'react-router';

const renderContactPage = () => {
    return render(
        <BrowserRouter>
            <Contact />
        </BrowserRouter>
    );
};

test('Contact page renders title and subtitle', () => {
    renderContactPage();
    expect(screen.getByText('Something Great.')).toBeDefined();
    expect(screen.getByText(/Have a technical question, feedback, or a business inquiry/i)).toBeDefined();
});



test('Contact page renders footer section logo or text', () => {
    renderContactPage();
    // Verify that the global footer is present on the page
    expect(screen.getByText(/Built with precision/i)).toBeDefined();
});
