import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {CookiesProvider, useCookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['jwt']);

  const saveToken = (token) => {
    setCookie("jwt", token, {path: "/"});
    const decoded = jwtDecode(cookie.jwt);
    console.log(cookie.jwt);
    console.log(decoded.sub);
  }

  const removeToken = () => {
    removeCookie(cookie["jwt-cookie"]);
  }

  const getToken = () => {
    return cookie.jwt;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/login" element={<LoginPage onLogin={saveToken}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
