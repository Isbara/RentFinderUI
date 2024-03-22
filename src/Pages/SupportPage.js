import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

function SupportPage({ getToken }) {
    const token = getToken();
    const bearer = 'Bearer ' + token;
    const isLoggedIn = token;

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        topic: '',
        location: '',
        details: ''
    });

    const [errors, setErrors] = useState({
        topic: '',
        location: '',
        details: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        connectToken();
    };

    const connectToken = async () => {
        try {
            const result = await fetch('http://localhost:8080/ticket', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json; charset=UTF-8',
                          'Authorization': bearer
                }
            });
            if (!result.ok) {
                // const errorResponse = await result.json();
            } else {
                 const resultInJson = await result.json();
                 console.log(resultInJson);
            }
        }
        catch (error)
        {
            console.error('Error:', error.message);
        }
    }

    return (
            <div>
                <Header isLoggedIn={isLoggedIn}/>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title text-center mb-4">Share your problem and we will solve it ASAP!</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Problem Topic:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="topic"
                                                name="topic"
                                                value={formData.topic}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.topic && <div className="invalid-feedback d-block">{errors.topic}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Location:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.location && <div className="invalid-feedback d-block">{errors.location}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Problem Details:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="details"
                                                name="details"
                                                value={formData.details}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.details && <div className="invalid-feedback d-block">{errors.details}</div>}
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block mt-3" >Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default SupportPage;