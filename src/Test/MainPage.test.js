import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from "../Pages/MainPage";
import { renderWithRouter } from './renderWithRouter';

describe('MainPage Component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<MainPage getToken={() => null} />);
        // Ensure that the component renders without throwing any errors
    });

    it('fetches and displays properties', async () => {
        const mockProperties = [
            {
                propertyID: 1,
                address: '123 Main St',
                description: 'Beautiful house',
                flatNo: 'A101',
                placeOffers: 'Yes',
                price: '$100,000',
                propertyType: 'H',
                image: 'base64encodedImage',
            },
            {
                propertyID: 2,
                address: '321 Main St',
                description: 'Incredible house',
                flatNo: 'B101',
                placeOffers: 'Wathso',
                price: '$200,000',
                propertyType: 'R',
                image: 'base64encodedImage',
            },
            // Add more mock properties as needed
        ];

        // Mock fetch function to return mock properties
        global.fetch = jest.fn().mockResolvedValueOnce({ //for insde useeffect
            ok: true,
            json: () => Promise.resolve(mockProperties),
        });

        renderWithRouter(<MainPage getToken={() => null} />);

        // Wait for properties to be fetched and displayed
        await waitFor(() => {
            mockProperties.forEach((property) => {
                expect(screen.getByText(property.address)).toBeInTheDocument();
                expect(screen.getByText(property.description)).toBeInTheDocument();
                expect(screen.getByText(property.flatNo)).toBeInTheDocument();
                expect(screen.getByText(property.placeOffers)).toBeInTheDocument();
                expect(screen.getByText(property.price)).toBeInTheDocument();
                expect(screen.getByText(property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment'))).toBeInTheDocument()
            });
        });


        // Ensure that the fetch request was made to the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/property/getProperties',
            expect.objectContaining({
                method: 'GET',
            })
        );
    });

    it('displays error message when fetching properties fails', async () => {
        // Mock fetch function to return an error
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch all properties'));

        renderWithRouter(<MainPage getToken={() => null} />);

        // Wait for error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('Failed to fetch all properties')).toBeInTheDocument();
        });
    });

    it('displays "No properties available" message when there are no properties', async () => {
        // Mock fetch function to return an empty array
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]),
        });

        renderWithRouter(<MainPage getToken={() => null} />);
        // Wait for the component to render
        await waitFor(() => {
            // Check if the "No properties available" message is displayed
            expect(screen.getByText('No properties available')).toBeInTheDocument();
        });

        // Ensure that the fetch request was made to the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/property/getProperties',
            expect.objectContaining({
                method: 'GET',
            })
        );
    });



    // Add more test cases as needed
});
