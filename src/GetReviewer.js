function GetReviewer(value){
    const reviewer = fetch('http://localhost:8080/user/'+value,{method: 'GET',  headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}});
    return reviewer;
} export default GetReviewer;