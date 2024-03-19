import React, { useState, useEffect } from 'react';
import HeaderLogged from './HeaderLogged';
import App from './App';
import './Pop-up.css';

function ProfilePage() {
    const [userDetails, setUserDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
                console.log(userData)
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        const token = App.getToken();
        connectUserDetails(token);
    },[]);

    const connectProperty = async () => {
        const token=App.getToken()
        try {
            const token=App.getToken()
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
        }
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
            <HeaderLogged />
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
                                    <li className="list-group-item">Property 1</li>
                                    <li className="list-group-item">Property 2</li>
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

        </div>
    );
}

export default ProfilePage;
