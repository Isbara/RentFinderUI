import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ReservationPage from "../Pages/ReservationPage";
import { renderWithRouter } from './renderWithRouter';


describe('ReservationPage Component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<ReservationPage getToken={() => null} />);
    });
    it('fetches user reservations when page is opened', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]),
        });

        renderWithRouter(<ReservationPage getToken={() => null} />);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/reservation/getAllUserReservations', expect.any(Object));
        });
    });


    /*it('renders textarea for adding comment when reservation status and approval are true', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve([
                {
                    reservationID: 1,
                    description: 'Sample description',
                    status: true,
                    approval: true,
                    review: {
                        userScore: 4, // Sample user score
                        description: 'Nice place!', // Sample review description
                        algoResult: true // Sample algo result
                    }
                }
            ])
        });

        const { getByRole } = renderWithRouter(<ReservationPage getToken={() => null} />);

        // Wait for reservations to be fetched
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // Find the textarea element
        const textarea = getByRole('textbox', { name: 'Write your comment...' });

        // Assert that the textarea element is rendered
        expect(textarea).toBeInTheDocument();
    });
*/

    
     /*   it('updates user score', () => {
            const { getByRole } = renderWithRouter(<ReservationPage getToken={() => null} />);
            const sampleReservations = [{ reservationID: 1, userScore: 3 }];

            fireEvent.click(getByRole('slider'));

            expect(getByRole('slider')).toHaveValue(4); // Assuming value increases by 1 on each click
        });

        it('submits description and user score updates', async () => {
            global.fetch = jest.fn().mockResolvedValueOnce({
                ok: true,
            });

            const { getByText } = renderWithRouter(<ReservationPage getToken={() => null} />);
            const sampleReservations = [{ propertyID: 1, reservationID: 1, description: 'Sample description', userScore: 3 }];

            fireEvent.click(getByText('Add Comment'));

            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/review/1/1', expect.any(Object));
        });
        */
});
