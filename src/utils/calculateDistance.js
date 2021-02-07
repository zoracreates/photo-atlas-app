import axios from 'axios';



async function calculateDistance(origin, destination) {

    let originLat = origin.latitude;
    let originLon = origin.longitude;
    let destLat = destination.latitude;
    let destLon = destination.longitude
    
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?&key=${process.env.REACT_APP_GOOGLE_API_KEY}&origins=${originLat},${originLon}&destinations=${destLat},${destLon}`


    try {
       let response = await axios.get(url)
       return response
       
    } catch(err) {
        console.log(err); 
    }

};


export default calculateDistance;

