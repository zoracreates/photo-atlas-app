import React from 'react'
import MapWithCards from '../../components/layout/MapWithCards'
import ResultsList from '../../components/content/ResultsList'
import firebase from '../../utils/firebase/firebaseConfig'
import { EditTripLarge, EditTripSmall } from '../../components/buttons/EditTripButtons'
import EditTripModal from '../../components/modals/EditTripModal'
class TripContent extends React.Component {
    state = {
        loaded: false,
        tripList: [],
        tripName: '',
        tripTags: '',
        locationsCount: 0,
        mapLat: null,
        mapLon: null,
        mapZoom: 10,
        showModal: false
    }
    _isMounted = false;

    privacy = this.getPrivacy()

    tripId = this.getTripId()

    getPrivacy () {
        let pathQuery = this.props.location.search;
        let searchParams = new URLSearchParams(pathQuery);
        let privacy = searchParams.get("privacy");
        return privacy;
    }

    getTripId() {
        let pathname = this.props.location.pathname;
        let tripId = pathname.replace("/trip/", "");
        return tripId;
    }


    componentDidMount() {
        this._isMounted = true;

        // let path = this.props.location.pathname;
        // let tripId = path.replace("/trip/", "");
        // let privacy = this.getPrivacy();

        this._isMounted && this.getTripDetails(this.privacy, this.tripId);

        // this._isMounted && this.setState({ tripPrivacy: this.privacy, tripId: tripId },
        //     () => {

                //this._isMounted && this.getTripDetails(this.privacy, this.tripId);

        //     }
        // )
    }

    getTripDetails(privacy, tripId) {
        let database = firebase.database();

        let tripName, locationsCount, tripRef, tripTags;
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
                tripTags = tripData['tags']
                locationsCount = tripData['locationsCount']
                this.setState({
                    tripName: tripName,
                    locationsCount: locationsCount,
                    tripTags: tripTags
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

    openModal(){
        this.setState({ showModal: true}) 
    }

    handleModal(updates) {
        let currentPrivacy = this.privacy;
        this.setState({ showModal: !this.state.showModal, updates })

        if(updates) {
            this.setState({ updates })
            let newPrivacy = updates['tripPrivacy'];
            if(newPrivacy && currentPrivacy !== newPrivacy) {
                this.props.history.push({
                    search: `?privacy=${newPrivacy}`
                  })
            }
        }

    }


    render() {
        let {
            loaded,
            tripList,
            mapLat,
            mapLon,
            mapZoom,
            locationsCount,
            tripName,
            tripTags } = this.state;


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
                                <EditTripSmall onClick={()=>this.openModal()} />
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
                                        <EditTripLarge onClick={()=>this.openModal()} />
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className={`container`}>
                            <ResultsList loaded={loaded} list={tripList} />
                        </div>

                    </MapWithCards>
                    <EditTripModal
                        isOpen={this.state.showModal}
                        handleClose={(updates) => this.handleModal(updates)}
                        originalTripName={tripName}
                        originalTripTags={tripTags}
                        originalTripPrivacy={this.privacy}
                        userId={this.props.userId}
                        tripId={this.tripId}
                    />
                </div>
            </>
        )
    }
}

export default TripContent;