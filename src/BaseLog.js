import {Link} from "react-router-dom";
import "./BaseLog.css";

function BaseLog(){
    return(
        <div>
            <h1><Link to="/"><h2>RENT FINDER</h2></Link><Link to="/register"><button>Register</button></Link></h1>
        </div>
    )
}export default BaseLog;