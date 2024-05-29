import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import App from '../App'

function LoginPage({ onLogin }) {
    
    let navigate = useNavigate();
    const [response, setResponse] = useState("");
    const [trigger,setTrigger] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if(trigger){
            console.log(response);
            onLogin(response);
            navigate("/");
        }
    },[response]);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    const handleClick = () => {
        navigate('/register');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        const resultInJson = await connectLogin();
        setTrigger(true);
        if(typeof(resultInJson)!=='undefined')
            setResponse(resultInJson.token);
    };
    const [error, setError] = useState("")

    const connectLogin = async () => {
       try {
           const result = await fetch('http://localhost:8080/user/login', {
               method: 'POST',
               body: JSON.stringify(loginData),
               headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}
           });
           if (!result.ok) {
               const errorResponse = await result.json();
               setError(errorResponse.msg);
           } else {
               const resultInJson = await result.json();
               return resultInJson;
           }
       }
       catch (error)
       {    console.log("catched error")
           setError("An unexpected error occurred. Please try again.");
       }
    }
    
    return (
        <div>
            <Header isLoggedIn={false}/> 
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">

                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={loginData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group pb-3">
                                        <label htmlFor="password">Password:</label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={loginData.password}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    <img
                                                        src={showPassword ?  'open_eye.png':'closed_eye.png'}
                                                        alt={showPassword ? 'Hide' : 'Show'}
                                                        style={{width: '40px', height: '20px'}}
                                                    />                                                </button>
                                            </div>
                                        </div>
                                        {error && <div className="invalid-feedback d-block">{error}</div>}
                                    </div>
                                    <p>
                                        Don't have an account?{' '}
                                        <span
                                            onClick={handleClick}
                                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                             Click here!
                                        </span>
                                    </p>
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
