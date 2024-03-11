import {Link} from "react-router-dom";
import "./BaseSup.css";

function BaseSup(){
    return(
        <div>
            <h1><Link to="/"><h2>RENT FINDER</h2></Link><Link to="/login"><button>Login</button></Link></h1>
        </div>
    )
}export default BaseSup;