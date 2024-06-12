import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function MainPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]); // State to store filtered properties
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [error, setError] = useState(null); // State to store fetch error
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState(""); // State to store the selected sort option

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
        const fetchData = async () => {
            await Promise.all([fetchAllProperties()]);
            setIsLoading(false); // Set isLoading to false when both fetches are completed
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Sort filteredProperties based on the selected sort option
        const sortedProperties = [...filteredProperties];
        sortedProperties.sort((a, b) => {
            if (sortOption === 'positiveNegativePercentage') {
                const positiveNegativePercentageA = (a.positiveReviews ) / (a.positiveReviews + a.negativeReviews) * 100 || -Infinity;
                const positiveNegativePercentageB = (b.positiveReviews ) / (b.positiveReviews + b.negativeReviews) * 100 || -Infinity;
                // If both properties have no positive or negative reviews, maintain their order
                if (isNaN(positiveNegativePercentageA) && isNaN(positiveNegativePercentageB)) return 0;
                // If only property A has no positive or negative reviews, move it to the end
                if (isNaN(positiveNegativePercentageA)) return 1;
                // If only property B has no positive or negative reviews, move it to the end
                if (isNaN(positiveNegativePercentageB)) return -1;
                // Sort normally based on positive-negative percentage difference
                return positiveNegativePercentageB - positiveNegativePercentageA;
            }else if (sortOption === 'ascendingPrice') {
                return a.price - b.price;
            } else if (sortOption === 'descendingPrice') {
                return b.price - a.price;
            }
            // For the default or empty option, maintain the original order
            return 0;
        });
        setFilteredProperties(sortedProperties);
    }, [sortOption]);



    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const handleSearch = () => {
        const filtered = allProperties.filter(property =>
            property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProperties(filtered);
        setCurrentPage(1);
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container mt-5">
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row ">
                        <div className="col-md-8">
                            <h2 className="mb-4">All Properties</h2>
                            {error && <p className="text-danger">{error}</p>}
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
                            )}
                            <div className="form-group mb-4">
                                <label htmlFor="sortOption">Sort by:</label>
                                <select className="custom-select" id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="">Select Sorting Option</option>
                                    <option value="positiveNegativePercentage">Positive Reviews</option>
                                    <option value="ascendingPrice">Ascending Price</option>
                                    <option value="descendingPrice">Descending Price</option>
                                </select>
                            </div>
                            <ul className="list-group">
                                {currentProperties.map(property => {
                                    // Calculate sentiment rating
                                    const sentimentRating = property.positiveReviews / (property.positiveReviews + property.negativeReviews) * 10;

                                    // Define background color based on sentiment rating with faded opacity
                                    let cardBackgroundColor, liBackgroundColor;
                                    if (property.positiveReviews + property.negativeReviews === 0) {
                                        cardBackgroundColor = '#e0e0e0'; // Gray when no reviews
                                        liBackgroundColor = 'rgba(224, 224, 224, 0)'; // Faded gray for <li> elements
                                    } else if (sentimentRating >= 8) {
                                        cardBackgroundColor = 'rgba(76, 175, 80, 0.3)'; // Green with faded opacity
                                        liBackgroundColor = 'rgba(76, 175, 80, 0)'; // Faded green for <li> elements
                                    } else if (sentimentRating >= 3) {
                                        cardBackgroundColor = 'rgba(255, 193, 7, 0.3)'; // Orange with faded opacity
                                        liBackgroundColor = 'rgba(255, 193, 7, 0)'; // Faded orange for <li> elements
                                    } else {
                                        cardBackgroundColor = 'rgba(255, 87, 34, 0.3)'; // Red with faded opacity
                                        liBackgroundColor = 'rgba(255, 87, 34, 0)'; // Faded red for <li> elements
                                    }

                                    return (
                                        <Link key={property.propertyID} to={`/property/${property.propertyID}`} className="list-group-item mb-4" style={{ background: '#f5f5f5' }}>
                                            <div className="card" style={{ backgroundColor: cardBackgroundColor }}>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>Property Details</span>
                                                        <span>
                                {property.positiveReviews + property.negativeReviews === 0 ?
                                    "No genuine reviews yet" :
                                    `Sentiment Rating: ${sentimentRating.toFixed(1)}`}
                            </span>
                                                    </h5>
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Address:</strong> {property.address}</li>
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Description:</strong> {property.description}</li>
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Flat No:</strong> {property.flatNo}</li>
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Place Offers:</strong> {property.placeOffers}</li>
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Price:</strong> {property.price}</li>
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Property Type:</strong> {property.propertyType === 'H' ? 'House' : (property.propertyType === 'R' ? 'Apartment Room' : 'Apartment')}</li>
                                                        <li className="list-group-item" style={{ backgroundColor: liBackgroundColor }}><strong>Property Owners Name:</strong> {property.ownerName} {property.ownerSurname}</li>
                                                    </ul>
                                                    {property.images && property.images.length > 0 && (
                                                        <img src={`data:image/jpeg;base64,${property.images[0].data}`} alt="Property" className="img-fluid mt-3" style={{ maxWidth: '300px', borderRadius: '5px' }} />
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </ul>





                            <div className="text-center mt-4">
                                <button className="btn btn-success mr-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                                <button className="btn btn-success" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProperty >= filteredProperties.length}>Next</button>
                            </div>
                        </div>
                    </div>
                )}
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
