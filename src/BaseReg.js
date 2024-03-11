import {Link} from "react-router-dom";
import "./BaseReg.css";

function BaseReg(){
    return(
        <div>
            <h1><Link to="/"><h2>RENT FINDER</h2></Link><Link to="/login"><button>Login</button></Link></h1>
        </div>
    )
}export default BaseReg;