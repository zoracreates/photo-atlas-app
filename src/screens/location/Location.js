import React from 'react'
import PropTypes from 'prop-types';

import PhotoSlider from '../../components/slider/PhotoSlider'
import SubjectIndicators from '../../components/content/SubjectIndicators'
import getFlickrPhotoInfo from '../../utils/flickr/getFlickrPhotoInfo'
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl'
import getFlickrPlace from '../../utils/flickr/getFlickrPlace'
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos'
import filterTags from '../../utils/filterTags'
import { DirectionsLarge } from '../../components/buttons/DirectionsButtons'
import { AddToTripsLarge, AddToTripsSmall } from '../../components/buttons/AddToTripsButtons'
import ManageTripsModal from '../../components/modals/ManageTripsModal'
import firebase from '../../utils/firebase/firebaseConfig'
import getSavesCount from '../../utils/getSavesCount'

class Location extends React.Component {
    state = {
        locationId: '',
        title: "",
        distance: 'loading...',
        saves: 0,
        destination: {
            latitude: 0,
            longitude: 0,
        },
        imageList: [],
        subjects: [],
        firstPhoto: {},
        showTripsModal: false,
        inTrips: false,
        userId: null,
        woeId: null
    };

    _isMounted = false;


    manageTripsModal() {
        this.setState({ showTripsModal: !this.state.showTripsModal })
        let userId = this.props.userId;
        this.checkIfInTrips(userId)

        getSavesCount(
            this.state.locationId,
            (count) => {

                this.setState({ saves: count })
            }
        );

    }

    checkIfInTrips(userId) {



        if (userId) {
            let database = firebase.database()


            this._isMounted && database.ref(`userTrips/${userId}`).get().then((snapshot) => {
                let locationTrips = [];
                if (snapshot.exists()) {
                    let trips = snapshot.val();


                    for (const tripId in trips) {

                        let privacy = trips[tripId]['tripPrivacy']

                        let location = this.state.locationId

                        let locationRef = `${privacy}Trips/${tripId}/locations/${location}`

                        this._isMounted && database.ref(`${locationRef}`).get().then(
                            snapshot => {

                                if (snapshot.exists()) {
                                    locationTrips.push(tripId)
                                }

                                if (locationTrips.length > 0) {

                                    this.setState({ inTrips: true })
                                    
                                } else {
                                    this.setState({ inTrips: false })
                                }

                            })


                    }

                }
                return locationTrips
            })
        }



    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId) {
            let userId = this.props.userId;

            this.checkIfInTrips(userId)

        }
    }



    componentDidMount() {
        this._isMounted = true;
        let userId = this.props.userId;
        this.checkIfInTrips(userId)

        //get the location id from the path
        let path = this.props.location.pathname;
        let locationId = path.replace("/location/", "");
        this.setState({ locationId: locationId });



        getSavesCount(
            locationId,
            (count) => {

                this.setState({ saves: count })
            }
        );



        //get the woeId from the search query
        let pathQuery = this.props.location.search;
        let searchParams = new URLSearchParams(pathQuery);
        let woeId = searchParams.get("woe");
        this.setState({woeId: woeId})


        //if the path starts with flickr
        if (locationId.startsWith("flickr-")) {


            //get the photo id
            let photoId = locationId.replace("flickr-", "");


            //get the photo information
            this._isMounted && getFlickrPhotoInfo(

                photoId,

                (data) => {

                    let photoData = data.photo;
                    let src, title, alt, lat, lon, author, creditUrl, tags;

                    if (photoData) {
                        src = createFlickrImageUrl(photoData);
                        title = photoData.title._content;
                        alt = photoData.description._content;
                        lat = photoData.location.latitude;
                        lon = photoData.location.longitude;
                        author = photoData.owner.realname;
                        if (!author) {
                            author = photoData.owner.username
                        }
                        creditUrl = photoData.urls.url[0]._content;
                        tags = photoData.tags
                    }

                    let firstPhoto = {
                        src: src,
                        title: title,
                        alt: alt,
                        lon: lon,
                        lat: lat,
                        author: author,
                        creditUrl: creditUrl,
                        tags: tags
                    }

                    this.setState({ firstPhoto: firstPhoto }, () => {

                        this.getLocationDetailsFromFlickr(photoId, woeId);

                    })
                }
            )

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    getLocationDetailsFromFlickr(photoId, woeId) {

        //get the photo data
        let photo = this.state.firstPhoto;
        let src = photo.src;
        let title = photo.title;
        let alt = photo.alt;
        let lat = photo.lat;
        let lon = photo.lon;
        let author = photo.author;
        let creditUrl = photo.creditUrl;



        //get each tag
        let tagsList = photo.tags;

        if (!tagsList) {
            tagsList = [];
        } else {
            tagsList = tagsList.tag
        }

        // generate a string from tags
        let tagsString = '';
        tagsList.forEach(
            (tag, index) => {
                tag = tag._content;
                if (tag) {
                    if (index === 0) {
                        tagsString = tagsString.concat(tag)
                    } else {
                        tagsString = tagsString.concat(`, ${tag}`)
                    }
                }
            }
        )

        //check if filter tags are within the tagsString, if so add subjects list
        if (tagsString) {

            let subjects = []

            //make the filterTags string into an array
            //for each item in the array check if it's in tags string
            //once one tag is found subject
            //use a "for" loop instead of "forEach" so that it breaks on first match

            let setSubject = (tagsArray, subject) => {
                for (let i = 0; i < tagsArray.length; i++) {
                    let tag = tagsArray[i];
                    if (tagsString.includes(tag)) {
                        subjects.push(subject)
                        break;
                    }
                }
            }

            //'abandoned'
            let abandonedString = filterTags.abandonedTags;
            let abandonedArray = abandonedString.split(', ');
            setSubject(abandonedArray, 'abandoned');

            //'architecture'
            let architectureString = filterTags.architectureTags;
            let architectureArray = architectureString.split(', ');
            setSubject(architectureArray, 'architecture');

            //'astro'
            let astroString = filterTags.astroTags;
            let astroArray = astroString.split(', ');
            setSubject(astroArray, 'astro');

            //'landscape'
            let landscapeString = filterTags.landscapeTags;
            let landscapeArray = landscapeString.split(', ');
            setSubject(landscapeArray, 'landscape');

            //'nature'
            let natureString = filterTags.natureTags;
            let natureArray = natureString.split(', ');
            setSubject(natureArray, 'nature');

            //'street art'
            let streetArtString = filterTags.streetArtTags;
            let streetArtArray = streetArtString.split(', ');
            setSubject(streetArtArray, 'street art');

            //'sunrise'
            let sunriseString = filterTags.sunriseTags;
            let sunriseArray = sunriseString.split(', ');
            setSubject(sunriseArray, 'sunrise');

            //'sunset'
            let sunsetString = filterTags.sunsetTags;
            let sunsetArray = sunsetString.split(', ');
            setSubject(sunsetArray, 'sunset');

            //'transport'
            let transportString = filterTags.transportTags;
            let transportArray = transportString.split(', ');
            setSubject(transportArray, 'transport');

            //'people'
            let peopleString = filterTags.peopleTags;
            let peopleArray = peopleString.split(', ');
            setSubject(peopleArray, 'people');

            //'urban'
            let urbanString = filterTags.urbanTags;
            let urbanArray = urbanString.split(', ');
            setSubject(urbanArray, 'urban');

            //'water'
            let waterString = filterTags.waterTags;
            let waterArray = waterString.split(', ');
            setSubject(waterArray, 'water');

            //if the location contains any subjects, update the state
            if (subjects.length > 0) {
                this.setState({ subjects: subjects })
            }
        }

        //create a location object and add it to imageList

        createFlickrImageUrl(photo)

        let location = {
            "title": title,
            "src": src,
            "alt": alt,
            "author": author,
            "creditUrl": creditUrl,
            "flickrId": photoId
        }

        let place = async (options) => {
            let placeName = await getFlickrPlace(options);
            return placeName
        }

        place({ "woeId": woeId }).then(placeName => {

            if (placeName) {
                location.title = placeName
            }

        }).then(

            this.setState(
                {
                    title: title,
                    destination: {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon)
                    },

                    imageList: [location] //will need to makesure this stays as first photo when others are added
                }
            )

        ).then(
            () => {


                //use woeid to get other images
                let options = {
                    "lat": lat,
                    "lon": lon,
                    "extras": "geo, description, owner_name, tags",
                    "accuracy": 16
                }

                getFlickrPhotos(options).then(
                    data => {

                        if (data) {

                            let photos = data.photos

                            if (photos) {
                                photos = photos.photo
                                let imageList = this.state.imageList;

                                photos.forEach(
                                    photo => {
                                        //only select photos with the same woeid (same location)
                                        //prevent duplicate locations and locations with no tags
                                        if (photo.woeid === woeId && photo.id !== photoId && photo.tags) {

                                            let newTitle = photo.title;
                                            let newSrc = createFlickrImageUrl(photo);
                                            let newAlt = photo.description._content;
                                            let newAuthor = photo.ownername;
                                            let ownerId = photo.owner;
                                            let newCreditUrl = `https://www.flickr.com/photos/${ownerId}/${photo.id}`;
                                            let newphotoId = photo.id;


                                            let newLocation = {
                                                "title": newTitle,
                                                "src": newSrc,
                                                "alt": newAlt,
                                                "author": newAuthor,
                                                "creditUrl": newCreditUrl,
                                                "flickrId": newphotoId
                                            }

                                            imageList.push(newLocation);

                                            this.setState({ imageList: imageList })

                                        }

                                    }
                                )
                            }
                        }


                    }
                )
            }

        )

    }


    render() {

        let { title,
            saves,
            destination,
            imageList,
            subjects,
            inTrips } = this.state;

        if (!title) {
            title = "Untitled Location"
        }

        if (!saves) {
            saves = 0;
        }

        return (
            <>
                <div className="location">
                    <div className='dark-background mobile-header'>
                        <div className={`container mobile-padding`}>
                            <button onClick={() => { window.history.back() }} className={`secondary-button back-button`}>Back</button>
                            <AddToTripsSmall added={inTrips} onClick={() => { this.manageTripsModal() }} />
                        </div>

                    </div>
                    <div className={`container mobile-padding`}>

                        {imageList && <PhotoSlider imageList={imageList} />}

                        <h2 className={`title`}>{title}</h2>
                        <div className={`gird-70-30`}>
                            <div className={`col-70`}>
                                <p className={`meta-data saved`}>Saved in: {saves} {(saves > 1 || saves < 1) ? 'trips' : 'trip'}</p>
                                <p className={`meta-data marker`}>Coordinates: <a href={`https://maps.google.com/?q=${destination.latitude},${destination.longitude}`}>{destination.latitude}, {destination.longitude}</a></p>
                            </div>
                            <div className={`col-30`}>
                                <ul className="actions">
                                    <li>
                                        <DirectionsLarge latitude={destination.latitude} longitude={destination.longitude} />
                                    </li>
                                    <li>
                                        <AddToTripsLarge data-micromodal-trigger="modal-1" onClick={() => { this.manageTripsModal() }} added={inTrips} />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {subjects.length > 0 && <SubjectIndicators subjects={subjects} />}

                    </div>


                </div>
                <ManageTripsModal
                    isOpen={this.state.showTripsModal}
                    handleClose={() => this.manageTripsModal()}
                    locationId={this.state.locationId}
                    photos={this.state.imageList}
                    coordinates={this.state.destination}
                    subjects={this.state.subjects}
                    userId={this.state.userId}
                    woeId={this.state.woeId}

                />
            </>

        )

    }
}


Location.propTypes = {
    userId: PropTypes.string
}


export default Location;