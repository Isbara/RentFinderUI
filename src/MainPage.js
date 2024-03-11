import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import BaseMain from "./BaseMain";
import "./MainPage.css";

function MainPage(){

    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        const fetchPropertyList = async() => {
            const propertyData = await fetch('http://localhost:8080/property',{method: 'GET',  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
            const propertyDataJson = await propertyData.json();
            setPropertyList(propertyDataJson);
        };
        fetchPropertyList();
    },[]);

    const navigate = useNavigate();

    const handleClick = (chosenProperty) => (event) => {
        navigate("/demo", {state: chosenProperty}) //navigate('/componentB',{state:{id:1,name:'sabaoon'}});
    }

    console.log(propertyList);
    if(propertyList.length === 0){
        console.log("empty list");
        return (
            <div>
                <BaseMain/>
                <p>There are currently no properties in the system... Register your own property for renting now.</p>
            </div>
        );
    }
    else{
        return(
            <div>
                <BaseMain/>
                {propertyList.map(property => {
                    return(
                        <ul key={property.propertyID}>
                            <div>
                                <p>Type: {property.propertyType}</p>
                                <p>Address: {property.address}</p>
                                <p>{property.description}</p>
                                <h2>{property.price}<button onClick={handleClick(property)}>View page</button></h2>
                            </div>
                        </ul>
                    );
                })}
            </div>
        );
    }

} export default MainPage;