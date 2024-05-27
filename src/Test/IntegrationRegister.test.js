import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithRouter } from './renderWithRouter';

import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';

const server = setupServer(
    rest.post('/api/register', (req, res, ctx) => {
        const { name, surname, email, password, phoneNumber, dateOfBirth } = req.body;
        if (name && surname && email && password && phoneNumber && dateOfBirth) {
            // Assuming registration is successful if all fields are present
            return res(ctx.status(200));
        } else {
            return res(ctx.status(400), ctx.json({ error: 'Invalid registration data' }));
        }
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('redirects to login page after successful registration', async () => {
    render(
        renderWithRouter(<RegisterPage/>)
    );

    const nameInput = screen.getByLabelText('Name:');
    const surnameInput = screen.getByLabelText('Surname:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const phoneNumberInput = screen.getByLabelText('Phone number:');
    const dateOfBirthInput = screen.getByLabelText('Date of birth:');
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'Canberk' } });
    fireEvent.change(surnameInput, { target: { value: 'Diner' } });
    fireEvent.change(emailInput, { target: { value: 'canberkdiner@hotmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'DeliceBirDeli0' } });
    fireEvent.change(phoneNumberInput, { target: { value: '5338727035' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '2001-02-11' } });

    fireEvent.click(submitButton);

    // Wait for redirection to login page (change in URL)
    await waitFor(() => {
        expect(window.location.pathname).toBe('/login');
    });
});
