import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import  ProfilePage from "../Pages/ProfilePage";
import { renderWithRouter } from './renderWithRouter';
import { act } from 'react-dom/test-utils';


describe('ProfilePage Component', () => {




    it('renders without crashing', () => {
        renderWithRouter(<ProfilePage getToken={() => null} />);
    });


    it('displays user details fetched from API and shown', async () => {
        // Mock user details
        const userDetails = {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890'
        };

        // Mock function to fetch user details
        global.fetch = jest.fn().mockResolvedValueOnce({ //For useeffect()
            ok: true,
            json: () => Promise.resolve(userDetails)
        });

        // Render the UserDetailsCard component
        const { getByText, getByRole } = renderWithRouter(<ProfilePage getToken={() => null} />);

        // Wait for user details to be fetched and displayed
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
            expect(getByText(`Name: ${userDetails.name}`)).toBeInTheDocument();
            expect(getByText(`Surname: ${userDetails.surname}`)).toBeInTheDocument();
            expect(getByText(`Email: ${userDetails.email}`)).toBeInTheDocument();
            expect(getByText(`Phone Number: ${userDetails.phoneNumber}`)).toBeInTheDocument();
        });

        // Check if Edit Details button is present
        const editButton = getByRole('button', { name: /Edit Details/i });
        expect(editButton).toBeInTheDocument();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8080/user/getUserDetails',
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });


    });

/*
    it('displays user properties fetched from API and shown', async () => {
        // Mock user properties
        const mockUserProperties = [
            {
                propertyID: 1,
                address: '123 Main St',
                flatNo: 101,
                description: 'Spacious apartment with a view',
                placeOffers: 'Available for rent',
                price: 1500,
                propertyType: 'A',
                image: 'base64EncodedImage1'
            },
            {
                propertyID: 2,
                address: '456 Elm St',
                flatNo: 202,
                description: 'Cozy house with a backyard',
                placeOffers: 'For sale',
                price: 250000,
                propertyType: 'H',
                image: 'base64EncodedImage2'
            }
        ];

        // Mock function to fetch user properties
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUserProperties)
        });

        // Render the component
        const { getByText, getAllByRole } = renderWithRouter(<ProfilePage getToken={() => null} />);

        // Wait for user properties to be fetched and displayed
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
            console.log(mockUserProperties)
            mockUserProperties.forEach(property => {
                console.log(property.address)
                expect(getByText(`Address: ${property.address}`)).toBeInTheDocument();
                expect(getByText(`Flat No: ${property.flatNo}`)).toBeInTheDocument();
                expect(getByText(`Description: ${property.description}`)).toBeInTheDocument();
                expect(getByText(`Place Offers: ${property.placeOffers}`)).toBeInTheDocument();
                expect(getByText(`Price: ${property.price}`)).toBeInTheDocument();
                expect(getByText(`Property Type: ${property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment')}`)).toBeInTheDocument();
                expect(getAllByRole('img', { alt: 'Property' })).toHaveLength(mockUserProperties.length);
            });
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8080/user/getUserProperties',
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });
    });
*/

    
    it('displays and submits property addition form properly', async () => {
        // Render the component
        const { getByText, getByLabelText, queryByText, queryByTestId } = renderWithRouter(<ProfilePage getToken={() => null} />);
        // Check that the property addition modal is initially hidden or closed
        expect(queryByText('Submit')).not.toBeInTheDocument();

        // Trigger the action that displays the property addition modal
        fireEvent.click(getByText('Add New Property'));

        // Check that the property addition modal is visible
        await waitFor(() => {
            expect(getByText('Submit')).toBeInTheDocument();
        });

        // Simulate property addition action (e.g., changing input value and submitting the form)
        fireEvent.change(getByLabelText('Property Type:'), { target: { value: 'A' } });
        fireEvent.change(getByLabelText('Flat No:'), { target: { value: '101' } });
        fireEvent.change(getByLabelText('Address:'), { target: { value: '123 Main St Road Beatles' } });
        fireEvent.change(getByLabelText('Description:'), { target: { value: 'Description Description Description' } });
        fireEvent.change(getByLabelText('Price:'), { target: { value: '10000' } });
        fireEvent.change(getByLabelText('Place Offers:'), { target: { value: 'Test offers Test offers Test offers' } });

        // Simulate file selection
        const fileInput = getByLabelText('Image:');
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Wait for the form submission to complete
        fireEvent.click(getByText('Submit'));
        await waitFor(() => {
            // Assert that the modal is still open because of errors
            expect(queryByText('Submit')).not.toBeInTheDocument();
            expect(queryByTestId('propertyType-error')).not.toBeInTheDocument();
            expect(queryByTestId('flatNo-error')).not.toBeInTheDocument();
            expect(queryByTestId('address-error')).not.toBeInTheDocument();
            expect(queryByTestId('description-error')).not.toBeInTheDocument();
            expect(queryByTestId('price-error')).not.toBeInTheDocument();
            expect(queryByTestId('placeOffers-error')).not.toBeInTheDocument();
            expect(queryByTestId('image-error')).not.toBeInTheDocument();
        });

        // Optionally, you can check for additional assertions after the form submission
    });





});




