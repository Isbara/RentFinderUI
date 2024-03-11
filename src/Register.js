import { useContext, useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import BaseReg from "./BaseReg";

function Register(){

    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    
    let navigate = useNavigate();
    

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleDateChange = (event) => {
        setDateOfBirth(event.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const result = await fetch('http://localhost:8080/user',{method: 'POST', body: JSON.stringify({"name": name, "surname": surname, "email": email, "password": password, "phoneNumber": phoneNumber, "dateOfBirth": dateOfBirth}),  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
        const resultInJson = result.json();
        console.log(resultInJson);
        navigate("/");
    }


    return(
        <div>
            <BaseReg/>
            <form onSubmit={handleSubmit}>
                <label>Name:<input value = {name} onChange={handleNameChange} type="text"></input></label>
                <label>Surname:<input value = {surname} onChange={handleSurnameChange} type="text"></input></label>
                <label>Email:<input value = {email} onChange={handleEmailChange} type="text"></input></label>
                <label>Password:<input value = {password} onChange={handlePasswordChange} type="password"></input></label>
                <label>Phone Number:<input value = {phoneNumber} onChange={handlePhoneNumberChange} type="number"></input></label>
                <label>Date of Birth:<input type="date" onChange={handleDateChange}></input></label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default Register;