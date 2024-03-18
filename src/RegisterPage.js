import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNotLogged from './HeaderNotLogged';
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

    const [errors, setErrors] = useState({
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
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            connectRegister();
        }
    };

    const connectRegister = async () => {
        const result = await fetch('http://localhost:8080/user/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8' }
        });
        const resultInJson = await result.text();
        console.log(resultInJson);
        navigate("/login");
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Validation logic for each field
        if (formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long.';
            valid = false;
        }
        if (formData.surname.length < 3) {
            newErrors.surname = 'Surname must be at least 3 characters long.';
            valid = false;
        }
        if (!/[a-z]/.test(formData.password) || !/\d/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
            newErrors.password = 'Password must include at least one lowercase letter, one uppercase letter, and one number.';
            valid = false;
        }
        else if(formData.password.length<6)
        {
            newErrors.password="Password must be at least 6 characters long.";
            valid=false;
        }


        if (!/^[0-9]+$/.test(formData.phoneNumber) || formData.phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Phone number must be a valid 10-digit number.';
            valid = false;
        }
        const dob = new Date(formData.dateOfBirth);
        const age = calculateAge(dob);
        if (age < 18) {
            newErrors.dateOfBirth = 'You must be at least 18 years old to register.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div>
            <HeaderNotLogged/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="surname">Surname:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="surname"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.surname && <div className="invalid-feedback d-block">{errors.surname}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone number:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateOfBirth">Date of birth:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.dateOfBirth && <div className="invalid-feedback d-block">{errors.dateOfBirth}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mt-3" >Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
