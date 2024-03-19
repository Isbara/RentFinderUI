import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {CookiesProvider, useCookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage"
import SupportPage from "./SupportPage"

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['jwt']);

  const saveToken = (token) => {
    setCookie("jwt", token, {path: "/"});
    const decoded = jwtDecode(cookie.jwt);
    console.log(cookie.jwt);
    console.log(decoded.sub);
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
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/login" element={<LoginPage onLogin={saveToken}/>}/>
          <Route exact path="/support" element={<SupportPage/>}/>
          <Route exact path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;