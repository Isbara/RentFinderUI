import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function MainPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [allProperties, setAllProperties] = useState([]);

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

    useEffect(() => {
        fetchAllProperties();
    }, []);
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = allProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn}/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="mb-4">All Properties</h2>
                        <ul className="list-group">
                            {currentProperties.map(property => (
                                <Link key={property.propertyID} to={`/property/${property.propertyID}`} className="list-group-item">
                                    <div className="card-body">
                                        <h5 className="card-title">Property Details</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><strong>Address:</strong> {property.address}</li>
                                            <li className="list-group-item"><strong>Description:</strong> {property.description}</li>
                                            <li className="list-group-item"><strong>Flat No:</strong> {property.flatNo}</li>
                                            <li className="list-group-item"><strong>Place Offers:</strong> {property.placeOffers}</li>
                                            <li className="list-group-item"><strong>Price:</strong> {property.price}</li>
                                            <li className="list-group-item"><strong>Property Type:</strong> {property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment')}</li>
                                        </ul>
                                        {property.image && (
                                            <img src={`data:image/jpeg;base64,${property.image}`} alt="Property" className="img-fluid mt-3" style={{ maxWidth: '300px' }} />
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </ul>
                        <div className="text-center mt-4">
                            <button className="btn btn-success mr-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            <button className="btn btn-success" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProperty >= allProperties.length}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .list-group-item {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                `}
            </style>
        </div>
    );
}

export default MainPage;
