import React from 'react'
import MapWithCards from '../../components/layout/MapWithCards'
import ResultsList from '../../components/content/ResultsList'
import firebase from '../../utils/firebase/firebaseConfig'
import { EditTripLarge, EditTripSmall } from '../../components/buttons/EditTripButtons'

class TripContent extends React.Component {
    state = {
        loaded: false,
        tripId: '',
        userId: null,
        tripList: [],
        tripPrivacy: null,
        tripName: '',
        locationsCount: 0,
        mapLat: null,
        mapLon: null,
        mapZoom: 10,
    }
    _isMounted = false;


    componentDidMount() {
        this._isMounted = true;

        let path = this.props.location.pathname;
        let tripId = path.replace("/trip/", "");
        let pathQuery = this.props.location.search;
        let searchParams = new URLSearchParams(pathQuery);
        let privacy = searchParams.get("privacy");

        this._isMounted && this.setState({ tripPrivacy: privacy, tripId: tripId },
            () => {

                this._isMounted && this.getTripDetails(this.state.tripPrivacy, this.state.tripId);

            }
        )
    }





    getTripDetails(privacy, tripId) {
        let database = firebase.database();

        let tripName, locationsCount, tripRef;
        let list = []

        if (privacy === 'public') {
            tripRef = `publicTrips/${tripId}`
        } else {
            tripRef = `privateTrips/${tripId}`
        }

        database.ref(`${tripRef}`).get().then(
            snapshot => {
                let tripData = snapshot.val()
                tripName = tripData['tripName']
                locationsCount = tripData['locationsCount']
                this.setState({
                    tripName: tripName,
                    locationsCount: locationsCount
                })
                let locations = tripData['locations']



                for (const locationId in locations) {


                    let location, src, woeId, url, title, lat, lon, locationRef, photoId;
                    if (locationId.startsWith("flickr-")) {
                        src = "flickr"
                        locationRef = `appLocations/flickrSourced/${locationId}`
                        photoId = locationId.replace("flickr-", "");
                    }


                    database.ref(`${locationRef}`).get().then(
                        (snapshot) => {
                            let locationData = snapshot.val()
                            if (locationData) {
                                let photos = locationData["photos"]
                                let firstPhoto = photos[Object.keys(photos)[0]]
                                let coordinates = locationData["coordinates"]
                                woeId = locationData['woeId']
                                url = firstPhoto["src"]
                                title = locationData["locationName"]
                                lat = coordinates["latitude"]
                                lon = coordinates["longitude"]
                            }

                            location = {
                                "src": src,
                                "locationId": photoId,
                                "woeId": woeId,
                                "thumbnail": url,
                                "title": title,
                                "destination": {
                                    "latitude": parseFloat(lat),
                                    "longitude": parseFloat(lon)
                                }
                            }

                        }
                    ).then(() => list.push(location)).catch(error => console.log("issue getting location info", error)).then(
                        () => {

                            let firstLocation = list[0]
                            let coordinates = firstLocation["destination"]
                            let lon = coordinates["longitude"]
                            let lat = coordinates["latitude"]

                            let update = {
                                tripList: list,
                                loaded: true,
                                mapLat: lat,
                                mapLon: lon
                            }


                            this.setState(update)
                        }
                    )
                }
            }
        ).catch(error => console.log(error))

    }


    render() {
        let {
            loaded,
            tripList,
            mapLat,
            mapLon,
            mapZoom,
            locationsCount,
            tripName } = this.state;

        return (
            <>
                <div className={`trip`}>

                    <MapWithCards
                        mapLoctaions={tripList}
                        mapLat={mapLat}
                        mapLon={mapLon}
                        mapZoom={mapZoom}
                    >
                        <div className='dark-background mobile-header'>
                            <div className={`container mobile-padding`}>
                                <button onClick={() => { window.history.back() }} className={`secondary-button back-button`}>Back</button>
                                <EditTripSmall  />
                            </div>
                        </div>

                        <div className={`gird-70-30`}>
                            <div className={`col-70`}>
                                <div className={`container mobile-padding`}>
                                <h2 className="h6-font">{tripName}</h2>
                                <p>Locations: {locationsCount}</p>
                                </div>
                            </div>
                            <div className={`col-30`}>
                                <ul className="actions">
                                    <li>
                                        <EditTripLarge />
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className={`container`}>
                        <ResultsList loaded={loaded} list={tripList} />
                        </div>

                    </MapWithCards>
                </div>
            </>
        )
    }
}

export default TripContent;