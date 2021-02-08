import { LoadScript, DistanceMatrixService } from "@react-google-maps/api";

function GoogleCalculateDistance(props) {

    let { origin, destination, handleResponse = (res) => console.log(res) } = props;

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
                    if (res) {
                    //    return handleResponse(res.rows[0].elements[0].distance.text)
                       return handleResponse(res)
                    }
                    return undefined
                }}
            />
            </LoadScript>
        </>
    )
}

export default GoogleCalculateDistance;