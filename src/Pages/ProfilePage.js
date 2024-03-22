import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import App from '../App';
import '../Styles/Pop-up.css';


function ProfilePage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [userDetails, setUserDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReservationModel,setShowReservationModal]=useState(false);
    const [propertyID, setPropertyID] = useState(0);
    const [propertyDetails, setPropertyDetails] = useState({
        propertyType: '',
        flatNo: '',
        address: '',
        description: '',
        price: '',
        placeOffers: ''
    });
    const [popUpErrors, setpopUpErrors] = useState({
        propertyType: '',
        flatNo: '',
        address: '',
        description: '',
        price: '',
        placeOffers: ''
    });
    const [userProperties, setuserProperties] = useState([]);


    useEffect(() => {
        const connectUserDetails = async (token) => {
            try {
                const response = await fetch("http://localhost:8080/user/getUserDetails", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await response.json();
                setUserDetails(userData);
                console.log(userData);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        const fetchProperties = async (token) => {
            try {
                const response = await fetch("http://localhost:8080/property/getUserProperties", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                console.log(data);
                setuserProperties(data);
                console.log(userProperties);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
        connectUserDetails(token);
        fetchProperties(token);
    },[]);

    const connectProperty = async () => {
        const token=App.getToken();
        try {
            const token=App.getToken();
            const bearerToken = "Bearer " + token;
            const result = await fetch('http://localhost:8080/property/addProperty', {
                method: 'POST',
                body: JSON.stringify(propertyDetails),
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

    const connectUpdateProperty = async () => {
        const token=App.getToken();
        try {
            const token=App.getToken();
            const bearerToken = "Bearer " + token;
            const IDLink = propertyID;
            const result = await fetch('http://localhost:8080/property/updateProperty/' + IDLink, {
                method: 'PUT',
                body: JSON.stringify(propertyDetails),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': bearerToken
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

    const connectDeleteProperty = async () => {
        const token=App.getToken();
        try {
            const token=App.getToken();
            const bearerToken = "Bearer " + token;
            const IDLink = propertyID;
            const result = await fetch('http://localhost:8080/property/deleteProperty/' + IDLink, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': bearerToken
                }
            });

            if (!result.ok) {
               // const errorResponse = await result.json();
            } else {
             const resultInJson = await result.text();
             console.log(resultInJson);
                // Handle successful response, e.g., navigate to another page
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyDetails({ ...propertyDetails, [name]: value });
        setpopUpErrors({
            ...popUpErrors,
            [name]: ''
        });
    };

    const handlePopUpSubmit = (e) => {
        e.preventDefault();
        if (validatePopUpForm()) {
            connectProperty();
            setShowModal(false);
            setpopUpErrors({});
            window.location.reload();
        }
    };


    const handleUpdate = (key) => {
        setPropertyID(key);
        setShowUpdateModal(true);
    }

    const handleDelete = (key) => {
        setPropertyID(key);
        setShowDeleteModal(true);
    }

    const handleUpdatePopUpSubmit = (e) => {
        e.preventDefault();
        if (validatePopUpForm()) {
            connectUpdateProperty();
            setShowUpdateModal(false);
            setpopUpErrors({});
            window.location.reload();
        }
    };

    const handleDeletePopUp = (e) => {
        e.preventDefault();
        connectDeleteProperty();
        setShowDeleteModal(false);
        window.location.reload();
    };

    const validatePopUpForm = () => {
        let isValid = true;
        const updatedErrors = { ...popUpErrors };

        if (!propertyDetails.propertyType || propertyDetails.propertyType === 'E') {
            updatedErrors.propertyType = 'Select a Property Type';
            isValid = false;
        }
        if (!propertyDetails.flatNo || propertyDetails.flatNo < 0) {
            updatedErrors.flatNo = 'Flat No cannot be less than zero';
            isValid = false;
        }
        if (!propertyDetails.address || propertyDetails.address.length < 15) {
            updatedErrors.address = 'Address should have at least 15 characters';
            isValid = false;
        }
        if (!propertyDetails.description || propertyDetails.description.length < 15) {
            updatedErrors.description = 'Description should have at least 15 characters';
            isValid = false;
        }
        if (!propertyDetails.price || propertyDetails.price < 0) {
            updatedErrors.price = 'Price cannot be negative';
            isValid = false;
        }
        if (!propertyDetails.placeOffers || propertyDetails.placeOffers.length < 10) {
            updatedErrors.placeOffers = 'Place Offers should have at least 10 characters';
            isValid = false;
        }

        setpopUpErrors(updatedErrors);
        return isValid;
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Details</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Name: {userDetails?.name}</li>
                                    <li className="list-group-item">Surname: {userDetails?.surname}</li>
                                    <li className="list-group-item">Email: {userDetails?.email}</li>
                                    <li className="list-group-item">Phone Number: {userDetails?.phoneNumber}</li>
                                </ul>
                                <button className="btn btn-primary mt-3">Edit Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Current Properties</h5>
                                <ul className="list-group">
                                    {userProperties.map(property => (
                                        <li key={property.propertyID} className="list-group-item">
                                            <p>Address: {property.address}</p>
                                            <p>Description: {property.description}</p>
                                            <p>Flat No: {property.flatNo}</p>
                                            <p>Place Offers: {property.placeOffers}</p>
                                            <p>Price: {property.price}</p>
                                            <p>Property Type: {property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment')}</p>
                                            <button type="button" className="btn btn-primary" onClick={() => {handleUpdate(property.propertyID); setPropertyDetails(property)}}>Update</button>
                                            <button type="button" className="btn btn-primary mx-1" onClick={() => handleDelete(property.propertyID)}>Delete</button>
                                            <button type="button" className="btn btn-danger" onClick={() => setShowReservationModal(true)}>Reservations</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>Add New Property</button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Property</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handlePopUpSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="propertyType">Property Type:</label>
                                        <select className={`form-control ${popUpErrors.propertyType && 'is-invalid'}`} id="propertyType" name="propertyType" value={propertyDetails.propertyType} onChange={handleInputChange} required>
                                            <option value="E">Select Property Type</option>
                                            <option value="R">Apartment Room</option>
                                            <option value="A">Apartment</option>
                                            <option value="H">House</option>
                                        </select>
                                        {popUpErrors.propertyType && <div className="invalid-feedback d-block">{popUpErrors.propertyType}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="flatNo">Flat No:</label>
                                        <input type="number" className={`form-control ${popUpErrors.flatNo && 'is-invalid'}`} id="flatNo" name="flatNo" value={propertyDetails.flatNo} onChange={handleInputChange} required />
                                        {popUpErrors.flatNo && <div className="invalid-feedback d-block">{popUpErrors.flatNo}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address:</label>
                                        <input type="text" className={`form-control ${popUpErrors.address && 'is-invalid'}`} id="address" name="address" value={propertyDetails.address} onChange={handleInputChange} required />
                                        {popUpErrors.address && <div className="invalid-feedback d-block">{popUpErrors.address}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <textarea className={`form-control ${popUpErrors.description && 'is-invalid'}`} id="description" name="description" value={propertyDetails.description} onChange={handleInputChange} required />
                                        {popUpErrors.description && <div className="invalid-feedback d-block">{popUpErrors.description}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className={`form-control ${popUpErrors.price && 'is-invalid'}`} id="price" name="price" value={propertyDetails.price} onChange={handleInputChange} required />
                                        {popUpErrors.price && <div className="invalid-feedback d-block">{popUpErrors.price}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="placeOffers">Place Offers:</label>
                                        <input type="text" className={`form-control ${popUpErrors.placeOffers && 'is-invalid'}`} id="placeOffers" name="placeOffers" value={propertyDetails.placeOffers} onChange={handleInputChange} required />
                                        {popUpErrors.placeOffers && <div className="invalid-feedback d-block">{popUpErrors.placeOffers}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Property</h5>
                                <button type="button" className="close" onClick={() => setShowUpdateModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdatePopUpSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="propertyType">Property Type:</label>
                                        <select className={`form-control ${popUpErrors.propertyType && 'is-invalid'}`} id="propertyType" name="propertyType" value={propertyDetails.propertyType} onChange={handleInputChange} required>
                                            <option value="E">Select Property Type</option>
                                            <option value="R">Apartment Room</option>
                                            <option value="A">Apartment</option>
                                            <option value="H">House</option>
                                        </select>
                                        {popUpErrors.propertyType && <div className="invalid-feedback d-block">{popUpErrors.propertyType}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="flatNo">Flat No:</label>
                                        <input type="number" className={`form-control ${popUpErrors.flatNo && 'is-invalid'}`} id="flatNo" name="flatNo" value={propertyDetails.flatNo} onChange={handleInputChange} required />
                                        {popUpErrors.flatNo && <div className="invalid-feedback d-block">{popUpErrors.flatNo}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address:</label>
                                        <input type="text" className={`form-control ${popUpErrors.address && 'is-invalid'}`} id="address" name="address" value={propertyDetails.address} onChange={handleInputChange} required />
                                        {popUpErrors.address && <div className="invalid-feedback d-block">{popUpErrors.address}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <textarea className={`form-control ${popUpErrors.description && 'is-invalid'}`} id="description" name="description" value={propertyDetails.description} onChange={handleInputChange} required />
                                        {popUpErrors.description && <div className="invalid-feedback d-block">{popUpErrors.description}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className={`form-control ${popUpErrors.price && 'is-invalid'}`} id="price" name="price" value={propertyDetails.price} onChange={handleInputChange} required />
                                        {popUpErrors.price && <div className="invalid-feedback d-block">{popUpErrors.price}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="placeOffers">Place Offers:</label>
                                        <input type="text" className={`form-control ${popUpErrors.placeOffers && 'is-invalid'}`} id="placeOffers" name="placeOffers" value={propertyDetails.placeOffers} onChange={handleInputChange} required />
                                        {popUpErrors.placeOffers && <div className="invalid-feedback d-block">{popUpErrors.placeOffers}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">CONFIRM DELETION</h5>
                                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you would like to delete this property ?</p>
                                <div style={{display: "flex"}}>
                                <button type="button" style={{ marginRight: "auto" }} className="btn btn-success" onClick={handleDeletePopUp}>Yes</button>
                                <button type="button" style={{ marginLeft: "auto" }} className="btn btn-danger" onClick={() => setShowDeleteModal(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showReservationModel&& (
                {/* We should show that specific properties all reservations, we should write a backend endpoint*/}
            )}


        </div>
    );

}

export default ProfilePage;


