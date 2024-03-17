// RegisterPage.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const RegisterPage = () => {

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        connectRegister();
    };

    const connectRegister = async() => {
        const result = await fetch('http://localhost:8080/user/register',{method: 'POST', body: JSON.stringify(formData),  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
        const resultInJson = await result.text();
        console.log(resultInJson);
        navigate("/login");
    }

    return (
        <div className="register-page">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="surname"
                        id="surname"
                        name="surname"
                        value={formData.surname}
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
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone number:</label>
                    <input
                        type="phoneNumber"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
               <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
               </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default RegisterPage;
