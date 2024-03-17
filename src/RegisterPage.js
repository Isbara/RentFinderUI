// RegisterPage.js
import React, { useState } from 'react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        const validationErrors = {};
        if (!formData.username) {
            validationErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            validationErrors.username = 'Username must be at least 3 characters long';
        }
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        } else if (!/[0-9]/.test(formData.password)) {
            validationErrors.password = 'Password must contain at least one number';
        } else if (!/[!@#$%^&*]/.test(formData.password)) {
            validationErrors.password = 'Password must contain at least one symbol (!@#$%^&*)';
        } else if (!/[A-Z]/.test(formData.password)) {
            validationErrors.password = 'Password must contain at least one uppercase letter';
        }

        // Set errors if there are any
        setErrors(validationErrors);

        // If there are no errors, proceed with form submission
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted:', formData);
            // Add logic to handle form submission (e.g., send data to backend)
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};


export default RegisterPage;