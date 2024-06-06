import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import {CookiesProvider, useCookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ProfilePage from "./Pages/ProfilePage";
import SupportPage from "./Pages/SupportPage";
import PropertyPage from "./Pages/PropertyPage";
import ReservationPage from "./Pages/ReservationPage"
import OwnedReservationPage from "./Pages/OwnedReservationPage";


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
  const isLoggedIn=!!getToken();

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<MainPage getToken={getToken}/>}/>
            <Route exact path="/register" element={<RegisterPage getToken={getToken}/>}/>
            <Route exact path="/login" element={<LoginPage onLogin={saveToken}/>}/>
            <Route exact path="/support" element={isLoggedIn ? <SupportPage getToken={getToken}/> : <Navigate to='/login'/>}/>
            <Route exact path="/profile" element={isLoggedIn ? <ProfilePage getToken={getToken}/> : <Navigate to='/login'/>}/>
            <Route exact path="/reservation" element={isLoggedIn ? <ReservationPage getToken={getToken}/> : <Navigate to='/login'/>}/>
            <Route exact path="/property/:id" element={<PropertyPage getToken={getToken}/>}/>
            <Route exact path="/ownedreservation" element={isLoggedIn ? <OwnedReservationPage getToken={getToken}/> : <Navigate to='/login'/>}/>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>



        </div>
      </Router>
  );
}

export default App;


