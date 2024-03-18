import React, { useState, useEffect } from 'react';
import HeaderLogged from './HeaderLogged';
import App from './App';

function ProfilePage() {
    const [userDetails, setUserDetails] = useState(null);

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

    return (
        <div>
            <HeaderLogged />
            <div className="container">
                <div className="row">

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Details</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Name: {userDetails?.name}</li>
                                    <li className="list-group-item">Surname: {userDetails?.surname}</li>
                                    <li className="list-group-item">Email: {userDetails?.email}</li>
                                    <li className="list-group-item">Phone Number: {userDetails?.phoneNumber}</li>
                                </ul>
                                <button className="btn btn-primary mt-3">Edit Details</button>  {/* NonFunctional at the moment */}
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Current Properties</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Property 1</li>
                                    <li className="list-group-item">Property 2</li>

                                </ul>
                                <button className="btn btn-success mt-3">Add New Property</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
