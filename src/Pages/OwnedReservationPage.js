import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import App from "../App";

function OwnedReservationPage({ getToken }) {
    const [reservations, setReservations] = useState([]);
    const [isReservationLoading, setIsReservationLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});
    const [currentReservationID, setCurrentReservationID] = useState(null);
    const [showApprovalDecision,setshowApprovalDecision]=useState(false);
    const [showStatusDecision,setshowStatusDecision]=useState(false);
    const [responseErrors,setResponseErrors]=useState(false);

    const token = getToken();
    const isLoggedIn = !!token;
    let navigate = useNavigate();



    const connectUpdateStatus = async(key,decision) => {
        const token=App.getToken();
        const bearerToken = "Bearer " + token;
        try {
            const response = await fetch("http://localhost:8080/reservation/status/"+key, {
                method: 'PUT',
                body: JSON.stringify(decision),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': bearerToken
                }
            });

            if (!response.ok) {
                if(response.status === 403){
                    App.removeToken()
                    navigate("/login");
                }
                throw new Error('Failed to fetch property reservations');
            }
            console.log(response)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    const connectUpdateApproval = async(key,decision) => {
        const token=App.getToken();
        const bearerToken = "Bearer " + token;
        try {
            const response = await fetch("http://localhost:8080/reservation/approval/"+key, {
                method: 'PUT',
                body: JSON.stringify(decision),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': bearerToken
                }
            });

            if (!response.ok) {
                if(response.status === 403){
                    App.removeToken()
                    navigate("/login");
                }
                throw new Error('Failed to fetch property reservations');
            }
            console.log(response)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchReservationsForOwnedProperties = async () => {
        try {
            const token = App.getToken();
            const response = await fetch('http://localhost:8080/reservation/getReservationsForOwnedProperties', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.msg || "Failed to fetch reservations for owned properties.");
            } else {
                const data = await response.json();
                setReservations(data);
            }
        } catch (error) {
            console.error('Error fetching reservations for owned properties:', error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsReservationLoading(false);
        }
    };

    const submitRespond = async (reviewID) => {

        const responseText = responses[reviewID];
        if (!responseText || responseText.length < 15) {
            setResponseErrors(prevErrors => ({
                ...prevErrors,
                [reviewID]: 'Response must be at least 15 characters long.'
            }));
            return;
        }
        const token = App.getToken();
        const bearerToken = "Bearer " + token;
        try {
            const IDLink = reviewID;
            const result = await fetch('http://localhost:8080/review/response/' + IDLink, {method: "POST", body: JSON.stringify({"description": responses[reviewID]}), headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': bearerToken}});
            if (!result.ok) {
                if(result.status === 403){
                    App.removeToken()
                    navigate("/login");
                }
                throw new Error('Failed to fetch data');
            }
            else{
                const resultInJson = await result.json();
                console.log(resultInJson);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    const handleStatusApprove = (reservationID) => {
        connectUpdateStatus(currentReservationID,true)
        setshowStatusDecision(false);
        setReservations(prevState => ({
            ...prevState,
            [currentReservationID]: {
                ...prevState[currentReservationID],
                status: true
            }
        }));
        window.location.reload();
    }

    const handleStatusReject = (reservationID) => {
        connectUpdateStatus (currentReservationID,false)
        setshowStatusDecision(false);
        setReservations(prevState => ({
            ...prevState,
            [currentReservationID]: {
                ...prevState[currentReservationID],
                status: false
            }
        }));
        window.location.reload();
    }



    useEffect(() => {

        fetchReservationsForOwnedProperties();
    }, []);

    const handleApprove = (reservationID) => {
        connectUpdateApproval(currentReservationID,true)
        setshowApprovalDecision(false);
        setReservations(prevState => ({
            ...prevState,
            [currentReservationID]: {
                ...prevState[currentReservationID],
                approval: true
            }
        }));
        window.location.reload();
    }

    const handleReject = (reservationID) => {
        connectUpdateApproval(currentReservationID,false)
        setshowApprovalDecision(false);
        setReservations(prevState => ({
            ...prevState,
            [currentReservationID]: {
                ...prevState[currentReservationID],
                approval: false,
                status: false
            }
        }));
        window.location.reload();
    }

    const handleApprovalClick = (reservationID) => {
        setCurrentReservationID(reservationID);
        setshowApprovalDecision(true);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleRespondChange = (commentID, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [commentID]: value,
        }));
        setResponseErrors(prevErrors => ({
            ...prevErrors,
            [commentID]: null,
        }));
    };

    const handleStatusClick = (reservationID) => {
        setCurrentReservationID(reservationID);
        setshowStatusDecision(true);
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container mt-4">
                <h1 className="mb-4">All Reservation Requests To Your Properties</h1>

                {isReservationLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <div className="spinner-border" role="status" style={{ color: 'purple' }}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {reservations.length > 0 ? (
                            reservations.map(reservation => (
                                <div className="col-md-4 mb-4" key={reservation.reservationID}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Reservation Adress: {reservation.adress}</h5>
                                            <ul className="list-unstyled">
                                                <li>Number of people: {reservation.numberOfPeople}</li>
                                                <li>Start date: {formatDate(reservation.startDate)}</li>
                                                <li>End date: {formatDate(reservation.endDate)}</li>
                                                <li>Reservers phone number: {reservation.phoneNumber}</li>
                                                <li>Reservers Name: {reservation.userName} {reservation.userSurname}</li>
                                                <li>Reservers Karma Point: {reservation.karmaPoint}</li>
                                                <li>Approval: {reservation.approval === null ? 'Not specified' : (reservation.approval ? 'Approved' : 'Not Approved')}</li>
                                                <li>Status: {reservation.status === null ? 'Not specified' : (reservation.status ? 'Stayed' : 'Not Stayed')}</li>
                                            </ul>
                                            {reservation.approval === null && (
                                                <button className="btn btn-success" onClick={() => handleApprovalClick(reservation.reservationID)}>
                                                    Approval
                                                </button>
                                            )}
                                            {reservation.status === null && reservation.approval !== false && (
                                                <button className="btn btn-success mx-3" onClick={() => handleStatusClick(reservation.reservationID)} disabled={reservation.approval === null}>
                                                    Status
                                                </button>
                                            )}
                                            {reservation.status === true && reservation.review !== null && reservation.review.respondList.length > 0 && (
                                                <div>
                                                    <p>Review: {reservation.review.description}</p>
                                                    {reservation.review.respondList[0] && (
                                                        <p>Respond: {reservation.review.respondList[0].description}</p>
                                                    )}
                                                </div>
                                            )}
                                            {reservation.status === true && reservation.review !== null && reservation.review.respondList.length < 1 && (
                                                <div>
                                                <textarea
                                                    className="form-control mt-2"
                                                    rows="3"
                                                    placeholder="Write your response..."
                                                    value={responses[reservation.review.commentID] || ''}
                                                    onChange={(e) => handleRespondChange(reservation.review.commentID, e.target.value)}
                                                ></textarea>
                                                    {responseErrors[reservation.review.commentID] && (
                                                        <div className="text-danger mt-1">
                                                            {responseErrors[reservation.review.commentID]}
                                                        </div>
                                                    )}
                                                    <button className="btn btn-success mt-2" onClick={() => submitRespond(reservation.review.commentID)}>Submit</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="alert alert-info" role="alert">
                                    No reservations found.
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {showApprovalDecision && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Profile Details</h5>
                                    <button type="button" className="close" onClick={() => setshowApprovalDecision(false)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you approving the customer's visit?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleApprove}>Yes</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleReject}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showStatusDecision && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Profile Details</h5>
                                    <button type="button" className="close" onClick={() => setshowStatusDecision(false)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Did the customer stay in the place on the specified date?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleStatusApprove}>Yes</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleStatusReject}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default OwnedReservationPage;
