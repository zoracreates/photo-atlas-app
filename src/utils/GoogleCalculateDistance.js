import { LoadScript, DistanceMatrixService } from "@react-google-maps/api";

function GoogleCalculateDistance(props) {

    let { origin, destination, handleResponse } = props;

    let originLat = origin.latitude;
    let originLon = origin.longitude;
    let destLat = destination.latitude;
    let destLon = destination.longitude;

    return (
        <>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} 
            >
            <DistanceMatrixService
                options={{
                    destinations: [{ "lat": originLat, "lng": originLon }],
                    origins: [{ "lat": destLat, "lng": destLon }],
                    travelMode: "DRIVING"
                }}
                callback={(res) => {

                    console.log("RESPONSE", res.rows[0].elements[0].distance.text);
                    
                }}
            />
            </LoadScript>
        </>
    )
}

export default GoogleCalculateDistance;