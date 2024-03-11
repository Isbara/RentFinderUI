import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginScreen from './LoginScreen';
import MainPage from './MainPage';
import Register from './Register';
import PrototypeDemo from './PrototypeDemo';
import ContactSupport from './ContactSupport';
import {CookiesProvider, useCookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";

function App() {
  const [Cookies, setCookie, removeCookie] = useCookies(['jwt-cookie']);

  const handleLogin = (token) => {
    setCookie("jwt-cookie", token, {path: "/"});
    const decoded = jwtDecode(Cookies['jwt-cookie'].token);
    console.log(Cookies['jwt-cookie'].token);
    console.log(decoded.sub);
  }

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/login" element={<LoginScreen onLogin={handleLogin}/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/demo" element={<PrototypeDemo token={Cookies['jwt-cookie'].token}/>}/>
            <Route exact path="/support" element={<ContactSupport/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;

//<Router>
//<div className="App">
//  <div className="Page">
//    <Routes>
//      <Route exact path="/" element={<MainPage/>}/>
//      <Route exact path="/login" element={<LoginScreen/>}/>
//      <Route exact path="/register" element={<Register/>}/>
//      <Route exact path="/demo" element={<PrototypeDemo/>}/>
//      <Route exact path="/support" element={<ContactSupport/>}/>
//    </Routes>
//  </div>
//</div>
//</Router>