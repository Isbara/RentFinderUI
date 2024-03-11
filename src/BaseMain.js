import {Link} from "react-router-dom";
import "./BaseMain.css";

function BaseMain(){
    return(
        <div>
            <h1><Link to="/"><h2>RENT FINDER</h2></Link><Link to="/register"><button>Register</button></Link><Link to="/login"><button>Login</button></Link></h1>
        </div>
    )
}export default BaseMain;