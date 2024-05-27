import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import  RegisterPage from "../Pages/RegisterPage";
import { renderWithRouter } from './renderWithRouter';
import { act } from 'react-dom/test-utils';


describe('RegisterPage Component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<RegisterPage getToken={() => null} />);
    });

   it('updates input values', () => {
        const { getByLabelText } = renderWithRouter(<RegisterPage getToken={() => null} />);
        const nameInput = getByLabelText('Name:');
        const surnameInput= getByLabelText('Surname:');
        const emailInput = getByLabelText('Email:');
        const passwordInput= getByLabelText('Password:');
       const phoneNumberInput= getByLabelText('Phone number:');
       const dateOfBirthInput = getByLabelText('Date of birth:');


       fireEvent.change(nameInput, { target: { value: 'Canberk' } });
        fireEvent.change(surnameInput, { target: { value: 'Diner' } });
        fireEvent.change(emailInput, { target: { value: 'canberkdiner@hotmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'DeliceBirDeli0' } });
       fireEvent.change(phoneNumberInput, { target: { value: '5338727035' } });
       fireEvent.change(dateOfBirthInput,{ target: { value: '2001-02-11' } });

        expect(nameInput.value).toBe('Canberk');
       expect(surnameInput.value).toBe('Diner');
       expect(emailInput.value).toBe('canberkdiner@hotmail.com');
       expect(passwordInput.value).toBe('DeliceBirDeli0');
       expect(phoneNumberInput.value).toBe('5338727035');
       expect(dateOfBirthInput.value).toBe('2001-02-11');



       // Add similar tests for other input fields (surname, email, password, phoneNumber, dateOfBirth)
    });

    it('displays error messages on invalid input', async () => {
        const { getByLabelText, getByRole } = renderWithRouter(<RegisterPage getToken={() => null} />);
        const nameInput = getByLabelText('Name:');
        const surnameInput= getByLabelText('Surname:');
        const emailInput = getByLabelText('Email:');
        const passwordInput= getByLabelText('Password:');
        const phoneNumberInput= getByLabelText('Phone number:');
        const dateOfBirthInput = getByLabelText('Date of birth:');
        const submitButton = getByRole('button');

        fireEvent.change(nameInput, { target: { value: 'Ca' } });
        fireEvent.change(surnameInput, { target: { value: 'Di' } });
        fireEvent.change(emailInput, { target: { value: 'canberk@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'naber' } });
        fireEvent.change(phoneNumberInput, { target: { value: '533872703512312' } });
        fireEvent.change(dateOfBirthInput,{ target: { value: '2010-02-11' } });

        // Simulate clicking the submit button without filling in any fields
        fireEvent.click(submitButton);

        // Wait for error messages to appear
        await waitFor(() => {
            expect(screen.getByText('Name must be at least 3 characters long.')).toBeInTheDocument();
            expect(screen.getByText('Surname must be at least 3 characters long.')).toBeInTheDocument();
            expect(screen.getByText('Password must include at least one lowercase letter, one uppercase letter, and one number.')).toBeInTheDocument();
            expect(screen.getByText('Phone number must be a valid 10-digit number.')).toBeInTheDocument();
            expect(screen.getByText('You must be at least 18 years old to register.')).toBeInTheDocument();
        });
    });



    it('submits the form with correct data', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        const { getByLabelText, getByRole } =  renderWithRouter(<RegisterPage getToken={() => null} />);
        const nameInput = getByLabelText('Name:');
        const surnameInput = getByLabelText('Surname:');
        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Password:');
        const phoneNumberInput = getByLabelText('Phone number:');
        const dateOfBirthInput = getByLabelText('Date of birth:');
        const submitButton = getByRole('button');

        act(() => {
            fireEvent.change(nameInput, { target: { value: 'Canberk' } });
            fireEvent.change(surnameInput, { target: { value: 'Diner' } });
            fireEvent.change(emailInput, { target: { value: 'canberkdiner@hotmail.com' } });
            fireEvent.change(passwordInput, { target: { value: 'DeliceBirDeli0' } });
            fireEvent.change(phoneNumberInput, { target: { value: '5338727035' } });
            fireEvent.change(dateOfBirthInput, { target: { value: '2001-02-11' } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/user/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'Canberk',
                    surname: 'Diner',
                    email: 'canberkdiner@hotmail.com',
                    password: 'DeliceBirDeli0',
                    phoneNumber: '5338727035',
                    dateOfBirth: '2001-02-11'
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
            });
        });
    });


});




