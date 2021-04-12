import React from 'react'
import MapWithCards from '../../components/layout/MapWithCards'
import ResultsList from '../../components/content/ResultsList'
import firebase from '../../utils/firebase/firebaseConfig'
import { EditTripLarge, EditTripSmall } from '../../components/buttons/EditTripButtons'
import { BookmarkTripLarge, BookmarkTripSmall } from '../../components/buttons/BookmarkTripButtons'
import EditTripModal from '../../components/modals/EditTripModal'
import BookmarkModal from '../../components/modals/BookmarkModal'
import addToBookmarks from '../../utils/addToBookmarks'
import removeFromBookmarks from '../../utils/removeFromBookmarks'

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
        showEditModal: false,
        tripPrivacy: null,
        authorId: '',
        authorName:'',
        bookmarked: false,
        updatingBookmark: false,
        showBookmarkModal: false
    }
    _isMounted = false;

    tripId = this.getTripId()

    getPrivacy() {
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

        let privacy = this.getPrivacy()

        this.setState({ tripPrivacy: privacy }, () => {
            this._isMounted && this.getTripDetails(this.state.tripPrivacy, this.tripId);
            //check if bookmarked
            this._isMounted && this.checkIfInBookmarks(this.props.userId);
        }
        )

    }

    componentDidUpdate(nextProps) {
        if(this.props.userId !== nextProps.userId) {
            this._isMounted && this.checkIfInBookmarks(this.props.userId);
        }
    }



    getTripDetails(privacy, tripId) {
        let database = firebase.database();

        let tripName, locationsCount, tripTags, authorId;
        let list = []
        let tripRef = `${privacy}Trips/${tripId}`

        database.ref(`${tripRef}`).get().then(
            snapshot => {
                let tripData = snapshot.val()
                tripName = tripData['tripName']
                tripTags = tripData['tags']
                authorId = tripData['author']
                locationsCount = tripData['locationsCount']
                this._isMounted && this.setState({
                    tripName: tripName,
                    locationsCount: locationsCount,
                    tripTags: tripTags,
                    authorId: authorId
                })

                database.ref(`users/${authorId}/displayName`).get().catch(error=>console.log(error)).then(
                    snapshot => {
                        if(snapshot){
                            let authorName = snapshot.val()
                            this._isMounted &&  this.setState({authorName: authorName})
                        }
                    }
                )

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

    openEditModal() {
        let privacy = this.getPrivacy()
        this.setState({ tripPrivacy: privacy },
            () => this.setState({ showEditModal: true }))
    }



    closeEditModal(update) {
        let updated = update['updated']
        let deleted = update['deleted']

        if (updated) {
            if (deleted) {
                this.setState({ showEditModal: !this.state.showEditModal },
                    () => {
                        this.props.history.push('/trips')
                    })

            } else {
                let newPrivacy = update['newPrivacy']

                if (newPrivacy && (this.state.tripPrivacy !== newPrivacy)) {
                    this.props.history.push({
                        search: `?privacy=${newPrivacy}`
                    })

                    this.setState({ tripPrivacy: newPrivacy })
                    this._isMounted && this.getTripDetails(newPrivacy, this.tripId);
                } else {
                    this._isMounted && this.getTripDetails(this.state.tripPrivacy, this.tripId);
                }
            }

        }
        this.setState({ showEditModal: !this.state.showEditModal })

    }


    checkIfInBookmarks(userId) {
        if (userId !== 'notSignedIn') {
           

            this.setState({updatingBookmark: true})
            let database = firebase.database()
        

            //get the user's bookmakrs
            this._isMounted && database.ref(`userBookmarks/${userId}`).get().catch(error=> console.log(error)).then((snapshot) => {
                let inBookmarks = false
                if (snapshot.exists()) {
                    let trips = snapshot.val();
                    //go through each trip and check if they match the current triId
                    for (const tripId in trips) {

                        if (tripId === this.tripId) {
                            inBookmarks = true
                        } 
                    }

                }

                return this.setState({bookmarked: inBookmarks, updatingBookmark: false})
            })
        }

    }




    handleBookmark() {
        if (this.props.userId !== 'notSignedIn') {
            this.setState({updatingBookmark: true })
            if(!this.state.bookmarked) {
                //add to book marks
                addToBookmarks(
                    this.props.userId,
                    this.tripId,
                    this.state.authorId,
                    this.state.tripPrivacy,
                    (errorMessage) => {
                        if(!errorMessage){
                            this.checkIfInBookmarks(this.props.userId)
                        } else {
                            this.setState({updatingBookmark:false})
                            console.log(errorMessage)
                        }
                    }
                )
               
           } else {
            //delete bookmark
            removeFromBookmarks(
                this.props.userId,
                this.tripId, 
                this.state.tripPrivacy,
                () => {
                    this.checkIfInBookmarks(this.props.userId)
                }
            )
           }
            
        } else {
            //bookmark
            this.setState({showBookmarkModal: true})
        }
    }



    closeBoomarkModal() {
        this.setState({showBookmarkModal: false})
        //check if in bookmarks
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
            tripTags,
            tripPrivacy,
            authorId,
            bookmarked,
            updatingBookmark,
            authorName } = this.state;


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
                                {loaded && this.props.userId === authorId && <EditTripSmall onClick={() => this.openEditModal()} />}
                                {loaded && this.props.userId !== authorId && <BookmarkTripSmall updating={updatingBookmark} bookmarked={bookmarked} onClick={() => this.handleBookmark()} />}
                            </div>
                        </div>

                        <div className={`gird-70-30`}>
                            <div className={`col-70`}>
                                <div className={`container mobile-padding`}>
                                    <h2 className="h6-font">{tripName}</h2>
                                    <p className={`meta-data`}>by {authorName}</p>
                                    <p className={`meta-data ${tripPrivacy === 'public' ? 'public' : 'private'}`}>{tripPrivacy}</p>
                                    <p className={`meta-data marker`}>{locationsCount} {locationsCount === 1 ? 'Location' : 'Locations'}</p>
                                    <p className={`meta-data tags`}>Tags: {tripTags}</p>
                                </div>
                            </div>
                            <div className={`col-30`}>
                                <ul className="actions">
                                    {loaded && this.props.userId === authorId && <li>
                                        <EditTripLarge onClick={() => this.openEditModal()} />
                                    </li>}
                                    {loaded && this.props.userId !== authorId && <li>
                                        <BookmarkTripLarge bookmarked={bookmarked} updating={updatingBookmark} onClick={() => this.handleBookmark()} />
                                    </li>}
                                </ul>
                            </div>
                        </div>
                        <div className={`container`}>
                            <ResultsList loaded={loaded} list={tripList} />
                        </div>

                    </MapWithCards>
                    <EditTripModal
                        isOpen={this.state.showEditModal}
                        handleClose={(update) => this.closeEditModal(update)}
                        originalTripName={tripName}
                        originalTripTags={tripTags}
                        originalTripPrivacy={tripPrivacy}
                        userId={this.props.userId}
                        tripId={this.tripId}
                        searchQuery={this.props.location.search}
                    />

                    <BookmarkModal
                        isOpen={this.state.showBookmarkModal}
                        handleClose={() => this.closeBoomarkModal()}
                        tripId={this.tripId}
                        tripPrivacy={tripPrivacy}
                        tripauthorId={authorId}
                    />
                </div>
            </>
        )
    }
}

export default TripContent;