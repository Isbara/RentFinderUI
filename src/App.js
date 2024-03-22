import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {CookiesProvider, useCookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ProfilePage from "./Pages/ProfilePage";
import SupportPage from "./Pages/SupportPage";
import PropertyPage from "./Pages/PropertyPage";
import ReservationPage from "./Pages/ReservationPage"

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['jwt']);

  const saveToken = async(token) => {
    await setCookie("jwt", token, {path: "/"});
//    console.log(cookie.jwt);
//    const decoded = jwtDecode(cookie.jwt);
//    console.log(cookie.jwt);
//    console.log(decoded.sub);
  }

  const removeToken = () => {
    removeCookie('jwt');
  }
  App.removeToken=removeToken

  const getToken = () => {
    return cookie.jwt;
  }
  App.getToken=getToken

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage getToken={getToken}/>}/>
          <Route exact path="/register" element={<RegisterPage getToken={getToken}/>}/>
          <Route exact path="/login" element={<LoginPage onLogin={saveToken}/>}/>
          <Route exact path="/support" element={<SupportPage getToken={getToken}/>}/>
          <Route exact path="/profile" element={<ProfilePage getToken={getToken}/>}/>
          <Route exact path="/property/:id" element={<PropertyPage getToken={getToken}/>}/>
          <Route exact path="/reservation" element={<ReservationPage getToken={getToken}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;