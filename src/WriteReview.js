import { useState } from "react"
import { jwtDecode } from "jwt-decode";
import "./WriteReview.css";

function WriteReview(props){
    const [reviewDesc, setReviewDesc] = useState("");
    const [rating, setRating] = useState(5);


    const saveReview = async() =>{
        const decoded = jwtDecode(props.userToken);
        const email = decoded.sub;
        const result = await fetch('http://localhost:5000/detection_server',{method: 'POST', body: JSON.stringify({"sentence": reviewDesc, "reviewerID": email, "propertyID": props.propertyID, "rating": rating}), headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
        const resultJson = await result.json();
        const bearer = 'Bearer ' + props.userToken;
        console.log(bearer);
        await fetch('http://localhost:8080/review/'+email+'/'+props.propertyID,{method: 'POST', body: JSON.stringify({"description": reviewDesc, "algoResult": resultJson.result, "userScore": rating}),  headers: {'Authorization': bearer, 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
    }

    const handleChange = (event) => {
        setReviewDesc(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        saveReview();
    }

    return <form onSubmit={handleSubmit}>
        <textarea value={reviewDesc} onChange={handleChange}>Review: </textarea>
        <label>Rating: <input value={rating} onChange={(event) => {setRating(event.target.value)}} type="number"></input></label>
        <button type="submit">Submit review</button>
    </form>
}export default WriteReview;