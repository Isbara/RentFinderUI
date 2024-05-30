import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../Styles/Pop-up.css';
//import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../Styles/review.css';
import App from '../App';

function PropertyPage({ getToken }) {
    const navigate = useNavigate();
    const token = getToken();
    const isLoggedIn = token;
    const [property, setProperty] = useState(null);
    const [review, setReview] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);


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
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle changes in the reservation form inputs
    const handleReservationInputChange = (e) => {
        const { name, value } = e.target;
        setReservationDetails({ ...reservationDetails, [name]: value });
        setReservationErrors({ ...reservationErrors, [name]: '' }); // To clear previous errors
    };

    // Function to handle submission of the reservation form
    const handleReservationSubmit = (e) => {
        e.preventDefault();
        if (validateReservationForm()) {
            connectReservation();
            setReservationDetails({});
            setShowModal(false);
        }
    };
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleCloseImage = () => {
        setSelectedImageIndex(null);
    };
    // Function to validate the reservation form
    const validateReservationForm = () => {
        let isValid = true;
        const updatedErrors = { ...reservationErrors };
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

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

        if (reservationDetails.endDate < reservationDetails.startDate) {
            updatedErrors.endDate = 'End date should be later than start date';
            isValid = false;
        }

        // Validate number of guests
        if (!reservationDetails.numberOfPeople) {
            updatedErrors.numberOfPeople = 'Number of guests is required';
            isValid = false;
        }

        if (reservationDetails.startDate < formattedDate) {
            updatedErrors.startDate = 'Start date can not be before current date';
            isValid = false;
        }

        setReservationErrors(updatedErrors);
        return isValid;
    };

    const fetchPropertyDetails = async () => {
        try {
            const response = await fetch('http://localhost:8080/property/getPropertyDetails/'+id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
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

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:8080/review/'+id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch property details');
            }

            // Extract property details from the response
            const reviewData = await response.json();

            // Set the property state with the fetched data
            setReview(reviewData);
            console.log(reviewData)
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const connectReservation = async () => {
        try {
            const result = await fetch('http://localhost:8080/reservation/makeReservation/'+id, {
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
                if(result.status === 403){
                    App.removeToken()
                    navigate("/login");
                }
            } else {
                const resultInJson = await result.json();
                console.log(resultInJson);
                // Handle successful response, e.g., navigate to another page
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchData = async () => {
        await Promise.all([fetchPropertyDetails(), fetchReviews()]);
        setIsLoading(false);
    };


    useEffect(() => {
        setIsLoading(true);



        fetchData();
    }, [id]);


    if (!property) {
        return null;
    }

    /*
    const handleNext = () => {
        setCurrentSlide(currentSlide === review.length - 1 ? 0 : currentSlide + 1);
    };

    const handlePrev = () => {
        setCurrentSlide(currentSlide === 0 ? review.length - 1 : currentSlide - 1);
    };
    */


    // Render property details once fetched
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container">
                {isLoading ? (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                    {property.images && property.images.length > 0 && (
                                        <div id="propertyCarousel" className="carousel slide mt-3" data-bs-ride="carousel" style={{ maxWidth: '100%', aspectRatio: '16/9' }}>
                                            <div className="carousel-inner">
                                                {property.images.map((image, index) => (
                                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                        <img
                                                            src={`data:image/jpeg;base64,${image.data}`}
                                                            alt={`Property Image ${index}`}
                                                            className="d-block w-100 img-fluid"
                                                            style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }}
                                                            onClick={() => handleImageClick(index)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            {property.images.length > 1 && (
                                                <>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>Reserve Property</button>
                        </div>
                    </div>
                )}

                <div className="container" style={{ position: 'relative' }}>
                    {/* Headline */}
                    {review.length > 0 && (
                        <h2 className="my-4">User Reviews</h2>
                    )}

                    {/* Display genuine reviews */}
                    {review
                        .filter(reviewItem => reviewItem.fakeResult !== false) // Filtering genuine reviews
                        .map((reviewItem, index) => (
                            <div key={index} className="comment mb-3 p-3 border">
                                <h3>Reviewer: {reviewItem.reviewerName}</h3>
                                <p>Reviewer Karma Points: {reviewItem.reviewerKarma}</p>
                                <p>User Score: {reviewItem.userScore}</p>
                                <p>
                                    Our algorithm says&nbsp;
                                    <span
                                        style={{
                                            color: reviewItem.fakeResult ? 'green' : 'red',
                                            fontWeight: 'bold',
                                            fontSize: '1.2em'
                                        }}
                                    >
                                    {reviewItem.fakeResult ? 'GENUINE' : 'FAKE'}
                                </span>
                                    &nbsp;for this review
                                </p>
                                <p>Review: {reviewItem.description}</p>
                                {reviewItem.respondList && reviewItem.respondList.length > 0 && (
                                    <p>Respond: {reviewItem.respondList[0].description}</p>
                                )}
                            </div>
                        ))}

                    {/* Display fake reviews with faded style */}
                    {review
                        .filter(reviewItem => reviewItem.fakeResult === false) // Filtering fake reviews
                        .map((reviewItem, index) => (
                            <div
                                key={index}
                                className="comment mb-3 p-3 border"
                                style={{
                                    color: 'rgba(0, 0, 0, 0.3)', // Faded text color
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)' // Faded background color
                                }}
                            >
                                <h3>Reviewer: {reviewItem.reviewerName}</h3>
                                <p>Reviewer Karma Points: {reviewItem.reviewerKarma}</p>
                                <p>User Score: {reviewItem.userScore}</p>
                                <p>
                                    Our algorithm says&nbsp;
                                    <span
                                        style={{
                                            color: reviewItem.fakeResult ? 'green' : 'red',
                                            fontWeight: 'bold',
                                            fontSize: '1.2em'
                                        }}
                                    >
                                    {reviewItem.fakeResult ? 'GENUINE' : 'FAKE'}
                                </span>
                                    &nbsp;for this review
                                </p>
                                <p>Review: {reviewItem.description}</p>
                                {reviewItem.respondList && reviewItem.respondList.length > 0 && (
                                    <p>Respond: {reviewItem.respondList[0].description}</p>
                                )}
                            </div>
                        ))}
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
                                            <input type="date" className={`form-control ${reservationErrors.startDate && 'is-invalid'}`} id="startDate" name="startDate" value={reservationDetails.startDate} onChange={handleReservationInputChange} required />
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
            {selectedImageIndex !== null && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={handleCloseImage}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={`data:image/jpeg;base64,${property.images[selectedImageIndex].data}`}
                                    alt={`Property Image ${selectedImageIndex}`}
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropertyPage;