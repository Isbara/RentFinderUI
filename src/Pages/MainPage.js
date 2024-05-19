import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function MainPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;

    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]); // State to store filtered properties
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [error, setError] = useState(null); // State to store fetch error

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
            setFilteredProperties(data); // Initialize filtered properties with all properties
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message); // Set error state
        }
    };

    useEffect(() => {
        fetchAllProperties();
    }, []);

    const handleSearch = () => { //when the seaerch button is clicked
        const filtered = allProperties.filter(property => //finds the specific property from all properties
                property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||  // case insensitive
                property.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProperties(filtered);
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn}/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="mb-4">All Properties</h2>
                        {error && <p className="text-danger">{error}</p>} {/* Display error message */}
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                placeholder="Search properties by address or description"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                        {filteredProperties.length === 0 && !error && (
                            <div className="alert alert-warning" role="alert">
                                No properties match your search
                            </div>
                        )} {/* Display message when no properties match search */}
                        <ul className="list-group">
                            {filteredProperties.map(property => (
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
                                        {property.images && property.images.length > 0 && (
                                            <img src={`data:image/jpeg;base64,${property.images[0].data}`} alt="Property" className="img-fluid mt-3" style={{ maxWidth: '300px' }} />
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </ul>
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
