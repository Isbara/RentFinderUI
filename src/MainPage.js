import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import HeaderLogged from './HeaderLogged';
import HeaderNotLogged from './HeaderNotLogged';

function MainPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;

    const [allProperties, setAllProperties] = useState([]);

    useEffect(() => {
        const fetchAllProperties = async () => {
            try {
                const response = await fetch("http://localhost:8080/property/getProperties", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch all properties');
                }
                const data = await response.json();
                setAllProperties(data);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchAllProperties();
    }, []);

    return (
        <div className="container mt-5">
            {isLoggedIn ? <HeaderLogged /> : <HeaderNotLogged />}
            <div className="row">
                <div className="col-md-8">
                    <h2 className="mb-4">All Properties</h2>
                    <ul className="list-group">
                        {allProperties.map(property => (
                            <Link key={property.propertyID} to={`/property/${property.propertyID}`} className="list-group-item">
                                <div>
                                    <p><strong>Address:</strong> {property.address}</p>
                                    <p><strong>Description:</strong> {property.description}</p>
                                    <p><strong>Flat No:</strong> {property.flatNo}</p>
                                    <p><strong>Place Offers:</strong> {property.placeOffers}</p>
                                    <p><strong>Price:</strong> {property.price}</p>
                                    <p><strong>Property Type:</strong> {property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment')}</p>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
