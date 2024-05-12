import React from 'react';
import LoginPage from "../Pages/LoginPage"
import { render, fireEvent ,waitFor,screen} from '@testing-library/react';
import { renderWithRouter } from './renderWithRouter';
import { act } from 'react-dom/test-utils';


describe('LoginPage Component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<LoginPage/>)
    });

    it('updates email input value', () => {
        const { getByLabelText } = renderWithRouter(<LoginPage/>)
        const emailInput = getByLabelText('Email:');
        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
        expect(emailInput.value).toBe('test@example.com');
    });

    it('updates password input value', () => {
        const { getByLabelText } = renderWithRouter(<LoginPage />);
        const passwordInput = getByLabelText('Password:');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
    });

    it('submits the form with correct data', async () => {
        const mockLoginResponse = { token: 'mock-token' }; // Placeholder token
        global.fetch = jest.fn().mockResolvedValueOnce({ // global.fetch indicates that whenever fetch is called it should come here, jest.fn() creates new mock function
            ok: true,  //mockResolvedValueOnce specifies the output
            json: () => Promise.resolve(mockLoginResponse),
        }); // This is used for specifying the output of a fetch operation, in this case user/login should return 200-successfull and token inside json

        const { getByLabelText, getByRole } = renderWithRouter(<LoginPage />);
        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Password:');
        const submitButton = getByRole('button');


        act(() => { // Wrap all async actions in the same act() call
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/user/login', { //Now we are saying this fetch operation should give the output of global.fetch
                method: 'POST',
                body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8' },
            });
        });
    });

    it('displays error message on unsuccessful login', async () => {
        const mockErrorResponse = { msg: 'Email or password is wrong.' }; // Mock error response
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve(mockErrorResponse),
        });

        const { getByText, getByRole } = renderWithRouter(<LoginPage />);
        const submitButton = getByRole('button');

        act(() => {
            fireEvent.click(submitButton);
        });
        // Wait for error message
        await waitFor(() => {
            const errorMessage = getByText('Email or password is wrong.');
            expect(errorMessage).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/user/login', {
                method: 'POST',
                body: JSON.stringify({email: '', password: ''}), // Assuming empty email and password for simplicity
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'},
            });
        });

    });


});
