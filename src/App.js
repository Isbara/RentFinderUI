import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import LoginScreen from './LoginScreen';
//import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
//import PrototypeDemo from './PrototypeDemo';
//import ContactSupport from './ContactSupport';
//import {CookiesProvider, useCookies} from "react-cookie";
//import {jwtDecode} from "jwt-decode";

function App() {
  //const [Cookies, setCookie, removeCookie] = useCookies(['jwt-cookie']);

 /* const handleLogin = (token) => {
    setCookie("jwt-cookie", token, {path: "/"});
    const decoded = jwtDecode(Cookies['jwt-cookie'].token);
    console.log(Cookies['jwt-cookie'].token);
    console.log(decoded.sub);
  }*/

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/register" element={<RegisterPage/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;

/* <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/login" element={<LoginScreen onLogin={handleLogin}/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/demo" element={<PrototypeDemo token={Cookies['jwt-cookie'].token}/>}/>
            <Route exact path="/support" element={<ContactSupport/>}/>*/