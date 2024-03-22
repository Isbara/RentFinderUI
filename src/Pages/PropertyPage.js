import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import '../Styles/Pop-up.css';

function PropertyPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [property, setProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();

    // State for reservation details
    const [reservationDetails, setReservationDetails] = useState({
        numberOfPeople: '',
        startDate: '',
        endDate: ''

    });

    // State for reservation form errors
    const [reservationErrors, setReservationErrors] = useState({
        numberOfPeople: '',
        startDate: '',
        endDate: ''

    });

    // Function to handle changes in the reservation form inputs
    const handleReservationInputChange = (e) => {
        const { name, value } = e.target;
        setReservationDetails({ ...reservationDetails, [name]: value });
        setReservationErrors({ ...reservationErrors, [name]: '' });
    };

    // Function to handle submission of the reservation form
    const handleReservationSubmit = (e) => {
        e.preventDefault();
        if (validateReservationForm()) {
            connectReservation()
            setReservationDetails({});
            setShowModal(false); 
        }
    };

    
    // Function to validate the reservation form
    const validateReservationForm = () => {
        let isValid = true;
        const updatedErrors = { ...reservationErrors };

        // Validate start date
        if (!reservationDetails.startDate) {
            updatedErrors.startDate = 'Start date is required';
            isValid = false;
        }

        // Validate end date
        if (!reservationDetails.endDate) {
            updatedErrors.endDate = 'End date is required';
            isValid = false;
        }

        if(reservationDetails.endDate<reservationDetails.startDate)
        {
            updatedErrors.endDate='End date should be later that start date';
            isValid=false;

        }

        // Validate number of guests
        if (!reservationDetails.numberOfPeople) {
            updatedErrors.numberOfPeople = 'Number of guests is required';
            isValid = false;
        }

        // Additional validation logic can be added here

        setReservationErrors(updatedErrors);
        return isValid;
    };

    // useEffect hook to fetch property details when the component mounts
    useEffect(() => {
        // Function to fetch property details from the API
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/property/getPropertyDetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }

                // Extract property details from the response
                const propertyData = await response.json();

                // Set the property state with the fetched data
                setProperty(propertyData);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        // Call the fetchPropertyDetails function when the component mounts
        fetchPropertyDetails();
    }, [id, token]);

    const connectReservation = async () => {
        try {
            const result = await fetch(`http://localhost:8080/reservation/makeReservation/${id}`, {
                method: 'POST',
                body: JSON.stringify(reservationDetails),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!result.ok) {
                // const errorResponse = await result.json();
            } else {
                const resultInJson = await result.json();
                console.log(resultInJson);
                // Handle successful response, e.g., navigate to another page
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    
    // Render loading message if property details are being fetched
    if (!property) {
        return <div>Loading...</div>;
    }

    // Render property details once fetched
    return (
        <div>
            <Header isLoggedIn={isLoggedIn}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card mt-4">
                            <div className="card-body">
                                <h2 className="card-title">Property Details</h2>
                                <p className="card-text">Property ID: {property.propertyID}</p>
                                <p className="card-text">Address: {property.address}</p>
                                <p className="card-text">Description: {property.description}</p>
                                <p className="card-text">Flat No: {property.flatNo}</p>
                                <p className="card-text">Place Offers: {property.placeOffers}</p>
                                <p className="card-text">Price: {property.price}</p>
                                <p className="card-text">Property Type: {property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment')}</p>
                            </div>
                        </div>
                        <button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>Reserve Property</button>
                    </div>
                </div>
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Reservation Page</h5>
                                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleReservationSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="startDate">Start Date:</label>
                                            <input type="date" className={`form-control ${reservationErrors.startDate && 'is-invalid'}`} id="startDate" name="startDate" value={reservationDetails.startDate} onChange={handleReservationInputChange} required
                                            />
                                            {reservationErrors.startDate && <div className="invalid-feedback d-block">{reservationErrors.startDate}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="endDate">End Date:</label>
                                            <input type="date" className={`form-control ${reservationErrors.endDate && 'is-invalid'}`} id="endDate" name="endDate" value={reservationDetails.endDate} onChange={handleReservationInputChange} required />
                                            {reservationErrors.endDate && <div className="invalid-feedback d-block">{reservationErrors.endDate}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numberOfPeople">Number of Guests:</label>
                                            <input type="number" className={`form-control ${reservationErrors.numberOfPeople && 'is-invalid'}`} id="numberOfPeople" name="numberOfPeople" value={reservationDetails.numberOfPeople} onChange={handleReservationInputChange} required />
                                            {reservationErrors.numberOfPeople && <div className="invalid-feedback d-block">{reservationErrors.numberOfPeople}</div>}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Reserve</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyPage;
