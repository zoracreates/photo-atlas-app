import React from 'react';
import PropTypes from 'prop-types';
import GoogleCalculateDistance from '../../utils/GoogleCalculateDistance';

import PhotoSlider from '../../components/slider/PhotoSlider'
import SubjectIndicators from '../../components/content/SubjectIndicators'
import getFlickrPhotoInfo from '../../utils/flickr/getFlickrPhotoInfo'
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl'
import getFlickrPlace from '../../utils/flickr/getFlickrPlace'
import getCurrentLocation from '../../utils/getCurrentLocation';
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import filterTags from '../../utils/filterTags'

class Location extends React.Component {
    state = {
        title: "",
        distance: 'loading...',
        saves: 0,
        destination: {
            latitude: 0,
            longitude: 0,
        },
        origin: {
            latitude: 0,
            longitude: 0,
        },
        imageList: [],
        subjects: [],
        firstPhoto: {}
    };

    _isMounted = false;


    componentDidMount() {
        this._isMounted = true;

        //get the location id from the path
        let path = this.props.location.pathname;
        let locationId = path.replace("/location/", "");

        //get the woeId from the search query
        let pathQuery = this.props.location.search;
        let searchParams = new URLSearchParams(pathQuery);
        let woeId = searchParams.get("woe")


        //if the path starts with flickr
        if (locationId.startsWith("flickr-")) {

            //get the photo id
            let photoId = locationId.replace("flickr-", "");

            //get the photo information
            this._isMounted && getFlickrPhotoInfo(

                photoId,

                (data) => {
                    this.setState({ firstPhoto: data.photo }, () => {

                        //get the photo data
                        let photo = this.state.firstPhoto;
                        let src = createFlickrImageUrl(photo);
                        let title = photo.title._content;
                        let alt = photo.description._content;
                        let lat = photo.location.latitude;
                        let lon = photo.location.longitude;
                        let author = photo.owner.realname;
                        if (!author) {
                            author = photo.owner.username
                        }
                        let creditUrl = photo.urls.url[0]._content;



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
                                for (let i = 0; i < tagsArray.length; i++ ) {
                                    let tag = tagsArray[i];
                                    if(tagsString.includes(tag)) {
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
                                this.setState( {subjects: subjects})
                            }
                        }

                        //create a location object and add it to imageList

                        createFlickrImageUrl(photo)

                        let location = {
                            "title": title,
                            "src": src,
                            "alt": alt,
                            "author": author,
                            "creditUrl": creditUrl
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
                                                            let newCreditUrl = `https://www.flickr.com/photos/${ownerId}/${photo.id}`


                                                            let newLocation = {
                                                                "title": newTitle,
                                                                "src": newSrc,
                                                                "alt": newAlt,
                                                                "author": newAuthor,
                                                                "creditUrl": newCreditUrl
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

                                //get the current location and set the distance
                                getCurrentLocation(
                                    (position) => {

                                        let coordinates = position.coords;
                                        this.setState({
                                            origin: {
                                                latitude: coordinates.latitude,
                                                longitude: coordinates.longitude
                                            }
                                        })
                                    },
                                    () => this.setState({ distance: "Unavailable" })
                                )
                            }

                        )

                    })
                }
            )

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { title,
            distance,
            saves,
            origin,
            destination,
            imageList,
            subjects } = this.state;

        if (!title) {
            title = "Untitled Location"
        }

        if (!saves) {
            saves = 0;
        }

        return (
            <div className={`container location mobile-padding`}>

                {imageList && <PhotoSlider imageList={imageList} />}

                <h2 className={`title`}>{title}</h2>
                <div className={`gird-70-30`}>
                    <div className={`col-70`}>
                        <p className={`meta-data saved`}>Saved by: {saves} {(saves > 1 || saves < 1) ? 'photographers' : 'photographer'}</p>
                        {distance && <p className={`meta-data distance`}>Distance: {distance}</p>}
                    </div>
                    <div className={`col-30`}>
                        <a href={`https://maps.google.com/?q=${destination.latitude},${destination.longitude}`} className={`action-button directions`}>Directions</a>
                    </div>

                </div>

                {subjects.length > 0 && <SubjectIndicators subjects={subjects} />}
                <GoogleCalculateDistance
                    destination={destination}
                    origin={origin}

                    handleResponse={
                        (response) => {
                            let row, element, distance;

                            row = response.rows[0]

                            if (row) {
                                element = row.elements[0]
                            }

                            if (element) {
                                distance = element.distance
                            }

                            if (distance) {
                                distance = distance.text
                                this.setState({ distance: distance })
                            }

                        }
                    }

                />


            </div>

        )

    }
}

Location.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    saves: PropTypes.number,
    distance: PropTypes.number,
    lon: PropTypes.number,
    lat: PropTypes.number,
    subjects: PropTypes.arrayOf(PropTypes.string)
}

export default Location;