import { useState } from "react";
import BaseSup from "./BaseSup";
import "./ContactSupport.css";


function ContactSupport(){

    const [topic,setTopic] = useState("");
    const [location,setLocation] = useState("");
    const [description,setDescription] = useState("");

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(topic,location,description);
        await fetch('http://localhost:8080/ticket',{method: 'POST',body: JSON.stringify({"topic": topic, "location": location, "details": description}), headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
    }


    return(
        <div>
            <BaseSup/>
            <form onSubmit={handleSubmit}>
                <label>Problem Topic: <input value={topic} onChange={handleTopicChange} type="text"></input></label>
                <label>Problem Location: <input value={location} onChange={handleLocationChange} type="text"></input></label>
                <label>Problem Description: <textarea value={description} onChange={handleDescriptionChange} type="text"></textarea></label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}export default ContactSupport;