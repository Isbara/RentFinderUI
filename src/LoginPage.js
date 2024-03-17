import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage({onLogin}){

    let navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        connectLogin();
    };

    const connectLogin = async() => {
        const result = await fetch('http://localhost:8080/user/login',{method: 'POST', body: JSON.stringify(loginData),  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
        if(result.status===200){
            const resultInJson = await result.json();
            console.log(resultInJson.token);
            onLogin(resultInJson.token);
            navigate("/");
        }
        else
            navigate("/login");
    }

    return(
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
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
                        value={loginData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginPage;