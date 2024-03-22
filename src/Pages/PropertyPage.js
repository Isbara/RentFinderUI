import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';


function PropertyPage({ getToken }) {
    const token = getToken();
    const isLoggedIn = token;
    const [property, setProperty] = useState(null);

    const { id } = useParams();
    console.log(id)
    console.log(token)

    // useEffect hook to fetch property details when the component mounts
    useEffect(() => {
        // Function to fetch property details from the API
        const fetchPropertyDetails = async () => {
            try {
                const IDLink = id;
                const response = await fetch(`http://localhost:8080/property/getPropertyDetails/`+ IDLink, {
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
    },[id, getToken]);

    // Render loading message if property details are being fetched
    if (!property) {
        return <div>Loading...</div>;
    }

    // Render property details once fetched
    return (
        <div>
            <Header isLoggedIn={isLoggedIn}/>
            <div>
                <h2>Property Details</h2>
                <p>Property ID: {property.propertyID}</p>
                <p>Address: {property.address}</p>
                {/* Add more property details as needed */}
            </div>
        </div>
    );
}

export default PropertyPage;
