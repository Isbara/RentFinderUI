import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Rating from '../Components/Rating'; 

function ReservationPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [reservations, setReservations] = useState([]);
    const [description, setDescription] = useState('');
    const [userScore, setuserScore] = useState(0); // State to track the rating value

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
            await setReservations(data);
        } catch (error) {
            console.error('Error fetching user reservations:', error);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleuserScoreChange = (value) => {
        setuserScore(value);
    };

    const handleSubmitDescription = async (propertyID, reservationID) => {
        console.log(propertyID);
        console.log(reservationID);
        console.log(description);
        console.log(userScore); // Log the rating value

        try {
            const response = await fetch(`http://localhost:8080/review/${propertyID}/${reservationID}`, {
                method: 'POST',
                body: JSON.stringify({ description, userScore }), // Include rating in the request body
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                fetchUserReservations();
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container mt-4">
                <h1 className="mb-4">User Reservations</h1>
                <div className="row">
                    {reservations.map(reservation => {
                        const approve=reservation.approval;
                        const status=reservation.status;
                        const hasReview = reservation.review !== null;

                        if (approve == null) {
                            return (
                                <div key={reservation?.reservationID} className="col-md-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Reservation ID: {reservation?.reservationID}</h5>
                                            <p className="card-text">Start date: {formatDate(reservation.startDate)}</p>
                                            <p className="card-text">End date: {formatDate(reservation.endDate)}</p>
                                            <p>Status: Waiting for approval from the property owner.</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (approve === false) {
                            return (
                                <div key={reservation?.reservationID} className="col-md-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Reservation ID: {reservation?.reservationID}</h5>
                                            <p className="card-text">Start date: {formatDate(reservation.startDate)}</p>
                                            <p className="card-text">End date: {formatDate(reservation.endDate)}</p>
                                            <p>Status: Property owner rejected your request! </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (status === false) {
                            return (
                                <div key={reservation?.reservationID} className="col-md-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Reservation ID: {reservation?.reservationID}</h5>
                                            <p className="card-text">Start date: {formatDate(reservation.startDate)}</p>
                                            <p className="card-text">End date: {formatDate(reservation.endDate)}</p>
                                            <p>Status: Property owner rejects that you stayed at their property</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (status == null) {
                            return (
                                <div key={reservation?.reservationID} className="col-md-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Reservation ID: {reservation?.reservationID}</h5>
                                            <p className="card-text">Start date: {formatDate(reservation.startDate)}</p>
                                            <p className="card-text">End date: {formatDate(reservation.endDate)}</p>
                                            <p>Status: Waiting for property owner's confirmation for writing request</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else
                        {return (
                            <div key={reservation?.reservationID} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Reservation ID: {reservation?.reservationID}</h5>
                                        <p className="card-text">Number of People: {reservation?.numberOfPeople}</p>
                                        <p className="card-text">Start date: {formatDate(reservation.startDate)}</p>
                                        <p className="card-text">End date: {formatDate(reservation.endDate)}</p>
                                        {hasReview ? (
                                            <div>
                                                <p className="card-text">Review: {reservation.review.description}</p>
                                                <p className="card-text">Algo Result: {reservation.review.algoResult ? "Genuine" : "Fake"}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <Rating value={userScore} onChange={handleuserScoreChange} />
                                                <textarea
                                                    className="form-control mt-2"
                                                    rows="3"
                                                    placeholder="Write your comment..."
                                                    value={description}
                                                    onChange={handleDescriptionChange}
                                                ></textarea>
                                                <button
                                                    className="btn btn-primary mt-2"
                                                    onClick={() => handleSubmitDescription(reservation?.propertyID, reservation?.reservationID)}
                                                >
                                                    Add Comment
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}






                    })}
                </div>
            </div>
        </div>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

export default ReservationPage;
