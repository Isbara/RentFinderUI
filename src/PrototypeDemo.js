import { useLocation } from "react-router-dom";
import ReservationList from "./ReservationList";
import RespondList from "./RespondList";
import ReviewList from "./ReviewList";
import WriteReview from "./WriteReview";
import "./PrototypeDemo.css";
import BaseMain from "./BaseMain";


function PrototypeDemo(token){

    const currentProperty = useLocation();
    const userToken = token.token;
    console.log(userToken);

    return(
        <div>
            <BaseMain/>
            <WriteReview propertyID={currentProperty.state.propertyID} userToken={userToken}></WriteReview>
            <ReviewList>{currentProperty.state.propertyID}</ReviewList>
        </div>
    )
}export default PrototypeDemo;
//<ReservationList/>