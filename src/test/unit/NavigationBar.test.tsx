import { render, screen } from '@testing-library/react';
import NavigationBar from '../../components/NavigationBar';
import {MemoryRouter} from "react-router";

test('button renders correctly', () => {
    render(
        <MemoryRouter>
            <NavigationBar/>
        </MemoryRouter>
    );
    const logoText = screen.getByText(/JayarathnaTech/i);
    expect(logoText).toBeDefined();
});