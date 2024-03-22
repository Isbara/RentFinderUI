import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

function ReservationPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchUserReservations();
    }, []);

    const fetchUserReservations = async () => {
        try {
            const response = await fetch('http://localhost:8080/reservation/getAllUserReservations', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching user reservations:', error);
        }
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container mt-4">
                <h1 className="mb-4">User Reservations</h1>
                <div className="row">
                    {reservations.map(reservation => (
                        <div key={reservation.reservationID} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Reservation ID: {reservation.reservationID}</h5> {/* If we remove JSON Ignore from backend we can achieve reserver and reserved place from here*/}
                                    <p className="card-text">Number of People: {reservation.numberOfPeople}</p>
                                    <p className="card-text">Start Date: {reservation.startDate}</p>
                                    <p className="card-text">End Date: {reservation.endDate}</p>
                                    {/* Add more reservation details as needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReservationPage;
