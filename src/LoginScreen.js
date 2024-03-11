import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import BaseLog from "./BaseLog";
import "./LoginScreen.css";

function LoginScreen({onLogin}){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    let navigate = useNavigate();
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const login = await fetch('http://localhost:8080/user/login',{method: 'POST', body: JSON.stringify({"email": email, "password": password}),  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
        const loginInJson = await login.json();
        console.log(loginInJson);
        const token = loginInJson.token;
        onLogin({token})
        navigate("/");
    }

    return(
        <div>
            <BaseLog/>
            <form onSubmit={handleSubmit}>
                <label>Email:<input value={email} onChange={handleEmailChange} type="text"></input></label>
                <label>Password:<input value={password} onChange={handlePasswordChange} type="password"></input></label>
                <Link to="/register"><button>Register</button></Link>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginScreen;