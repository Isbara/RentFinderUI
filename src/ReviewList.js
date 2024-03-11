import { useEffect, useState } from "react";
import RespondList from "./RespondList";
import "./ReviewList.css";

function ReviewList(props){

    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        const fetchReviewList = async() => {
            const reviewData = await fetch('http://localhost:8080/property/review/'+props.children, {method: 'GET',  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
            const reviewDataJson = await reviewData.json();
            setReviewList(reviewDataJson);
        };
        fetchReviewList();
    
    },[]);

    if(reviewList.length === 0){
        console.log("empty list");
        return <p>No reviews</p>;
    }
    else{
        return <div>
            <div>
            {reviewList.map(review => {
                let result = "";
                if(review.algoResult)
                    result = "true";
                else
                    result = "false";
                return (
                    <div className="review-item" key={review.reviewID}>
                        <div className="review-content">
                        <p className="review-user">{review.email}</p>
                        <p className="review-description">{review.description}</p>
                        <p className="algorithm-result">Algorithm result: {result}</p>
                        <p className="algorithm-userScore">User score: {review.userScore}</p>
                        </div>
                        <RespondList>{review.respondList}</RespondList>
                    </div>
                );
            })}
        </div>
        </div>
    }
 } export default ReviewList;