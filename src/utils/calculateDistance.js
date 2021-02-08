import axios from 'axios';




/*async function calculateDistance(origin, destination) {

    let originLat = origin.latitude;
    let originLon = origin.longitude;
    let destLat = destination.latitude;
    let destLon = destination.longitude

    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLon}&destinations=${destLat},${destLon}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`


    try {
        let response = await axios.get(url)
        return response

    } catch (err) {
        console.log(err);
    }

};*/

async function initGoogle() {
    try {
        let response = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        return response

    } catch (err) {
        console.log(err);
    }

}

function calculateDistance(start, end) {

    initGoogle().then(() => {

        let originLat = start.latitude;
        let originLon = start.longitude;
        let destLat = end.latitude;
        let destLon = end.longitude
    
        let origin = new google.maps.LatLng(originLat, originLon);
        let destination = new google.maps.LatLng(destLat, destLon);
    
        let service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination]
            }, callback);
    
        function callback(response, status) {
            console.log(response)
            console.log(status)
        }

    }



    )

}




export default calculateDistance;

