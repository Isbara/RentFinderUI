import { useEffect, useState } from "react";

function ReservationList(props){

    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        const fetchReservationList = async() => {
            const reservationData = await fetch('http://localhost:8080/property/'+ props.children.propertyID +'/user/'+ props.children.userID +'/reservations',{method: 'GET',  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
            const reservationDataJson = await reservationData.json();
            setReservationList(reservationDataJson);
        };
        fetchReservationList();

    },[props]);

    console.log(reservationList);
    if(reservationList.length === 0){
        console.log("empty list");
        return <p>No reservations</p>;
    }
    else{

        return <div>
            {reservationList.map(reservation => {
                return <ul key={reservation.reservationID}>
                    <p> Number of people: {reservation.numberOfPeople} Reservation date: {reservation.startDate} - {reservation.endDate} <button>Write review</button></p>
                    
                </ul>
            })}
        </div>
    }
}export default ReservationList;