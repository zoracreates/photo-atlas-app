import React from 'react'

import firebase from '../../utils/firebase/firebaseConfig'
import Authenticate from '../../screens/authentication/Authenticate'
import Modal from './Modal'
import TexInput from '../forms/TextInput'
import SubmitButton from '../forms/SubmitButton'
import RadioButton from '../forms/RadioButton'
import { generateDate, generateTimeNumber } from '../../utils/generateDateAndTime'
import generateID from '../../utils/generateId'

/*let tripsListPalceholder = [
    {
        title: "Shared trip, consectetur adipiscing",
        thumbnail: "https://picsum.photos/200/300",
        locationCount: 2,
        isPublic: false,
        isShared: true
    },
    {
        title: "Public Trip dolor sit ame, consectetur adipiscing",
        thumbnail: "https://picsum.photos/500/300",
        locationCount: 500000,
        isPublic: true,
    },
    {
        title: "Private trip dolor sit amet, consectetur piscing",
        thumbnail: "https://picsum.photos/200/400",
        locationCount: 12,
        isPublic: false
    }
] */



class ManageTripsModal extends React.Component {
    state = {
        modalTitle: 'Add or Remove from Trips',
        modalDescription: '',
        isAuthenticated: false,
        userId: '',
        existingTrips: [],
        newTripPrivacy: 'public',
        newTripName: '',
        newTripTags: '',
        newUser: false,
        creatingTrip: false,
        tripNameLength: 0,
        tripNameError: '',
        tripTagsError: '',
        newTripCreated: false,
        needNewTrip: false,
        errorCreatingTrip: '',
        errorCreatingLocation: '',
        errorUpdatingUserTrips: ''
    }

    _isMounted = false;

    closeModal() {
        this.setState({
            newTripCreated: false,
            newTripPrivacy: 'public',
            newTripName: '',
            newTripTags: '',
            errorCreatingTrip: '',
            errorCreatingLocation: '',
            errorUpdatingUserTrips: ''
        }, () => this.props.handleClose());
    }

    changeUserType(newUserValue) {
        this.setState({ newUser: newUserValue }, () => {

            if (this.state.newUser) {
                this.setState(
                    {
                        modalTitle: 'Sign Up',
                        modalDescription: 'Create an account to manage your trips.'
                    }
                )
            } else {
                this.setState(
                    {
                        modalTitle: 'Sign In',
                        modalDescription: 'Sign in to manage your trips.'
                    }
                )
            }
        })
    }

    checkAuth(user) {
        if (this._isMounted) {

            if (!user) {
                user = firebase.auth().currentUser;
            }

            if (user) {
                this.setState({ isAuthenticated: true, userId: user.uid })

                if (this.state.existingTrips.length < 1) {
                    this.setState(
                        {
                            modalTitle: 'Save to a New Trip',
                            modalDescription: ''
                        }
                    )
                } else {
                    this.setState({ isAuthenticated: true })
                }

            } else {
                this.setState(
                    {
                        modalTitle: 'Sign In',
                        modalDescription: 'Sign in to manage your trips.'
                    }
                )
            }
        }

    }

    componentDidMount() {
        this._isMounted = true;

        this.checkAuth();
        //set a listner or trips https://firebase.google.com/docs/database/web/read-and-write#web_value_events
    }

    renderModalContent() {
        //modal will ask user to sign in or create account if user is not authenticated
        //user will NOT be required to have a verified email when saving a location

        //authenticate
        if (!this.state.isAuthenticated) {
            return (
                <div className="modal-content-padding">
                    <Authenticate
                        hideTitle
                        changeUserOnParent={(newUserValue) => this.changeUserType(newUserValue)}
                        afterSignIn={(user) => this.checkAuth(user)}
                        afterCreateAccount={(user) => this.checkAuth(user)}

                    />
                </div>
            )
        } else {
            //if user has trips 
            if (this.state.existingTrips.length > 0 && !this.state.needNewTrip) {
                return this.selectExistingTrip();
            }
            else {
                if (!this.state.newTripCreated) {
                    return this.getNewTripInfo();
                } else {
                    return this.newTripCreated()
                }

            }

        }

    }

    selectExistingTrip() {
        //show list of trips
        //a button that triggets getNewTripInfo
        return (
            <>
                {this.renderExistingTrips()}
                <div className="modal-content-padding center-text">
                    <button onClick={() => this.switchForm()} className="button-link"> + Create a New Trip</button>
                </div>

            </>
        )
    }

    switchForm() {
        this.setState({ needNewTrip: !this.state.needNewTrip })
    }

    renderExistingTrips() {
        let { existingTrips } = this.state;

        // let existingTrips = tripsListPalceholder;

        return (<ul className="existing-trips">
            {existingTrips.map((trip, id) => {
                let { thumbnail, title, locationCount, isPublic, isShared } = trip;

                //check if location is in trip
                let inTrip;

                return (
                    <li key={id} className="trip-card-small">
                        <div className={`trip-card-image`}>
                            <img src={thumbnail} alt="" />
                        </div>
                        <div className={`trip-card-content`}>
                            <p className={`title`}>{title}</p>
                            <p className={`meta-data ${isPublic ? 'public' : 'private'}`}>
                                {isPublic ? 'Public' : isShared ? 'Shared' : 'Private'}</p>
                            <p className={`meta-data marker`}>
                                {locationCount} {locationCount > 1 ? 'Locations' : 'Location'}</p>
                            <buton className="add-or-remove" onClick={() => { this.addOrRemoveFromTrip(inTrip) }}>
                                {inTrip ? '- Remove' : '+ Add'}
                                <span>{inTrip ? `from ${title}` : `to ${title}`}</span>
                            </buton>
                        </div>
                    </li>
                )
            })}
        </ul>)

    }

    handleTripNamelInput(e) {
        e.preventDefault();
        let value = e.target.value;
        let valueLength = value.length;

        this.setState({
            newTripName: e.target.value,
            tripNameLength: valueLength,
            tripNameError: ""
        })
        if (valueLength > 50) {
            this.setState({
                tripNameError: "Your trip name is too long."
            })
        }
    }

    handleTripTagsInput(e) {
        e.preventDefault();

        this.setState({
            newTripTags: e.target.value,
            tripTagsError: ""
        }, () => {
            //check if tags have special characters other than comma
            let testString = /^[a-zA-Z ,0-9]+$/;

            if (this.state.newTripTags && !testString.test(this.state.newTripTags)) {
                this.setState({
                    tripTagsError: "Tags may only contain letters, numbers, and commas"
                })
            }
        });


    }

    renderDatabaseErrors() {
        if (
            this.state.errorCreatingLocation ||
            this.state.errorUpdatingUserTrips ||
            this.state.errorCreatingTrip
        ) {
            return (
                <div className="error-font" aria-live="polite">
                    <ul>
                        {this.state.errorCreatingTrip && <li>{this.state.errorCreatingTrip}</li>}
                        {this.state.errorUpdatingUserTrips && <li >{this.state.errorUpdatingUserTrips}</li>}
                        {this.state.errorCreatingLocation && <li>{this.state.errorCreatingLocation}</li>}
                    </ul>
                </div>
            )
        }


    }

    getNewTripInfo() {
        return (
            <>
                <h3 className="h5-font center-text">Create a New Trip</h3>
                {this.renderDatabaseErrors()}

                <form className="modal-content-padding">
                    <div className="form-component-wrapper">
                        <label htmlFor="trip-name">Trip Name (Max 50 Characters)</label>
                        <TexInput placeholder="Beautiful City" id="trip-name" value={this.state.newTripName} onChange={(e) => this.handleTripNamelInput(e)} required />
                        {this.state.tripNameLength !== 0 && <p className="character-count" aria-live="polite">Characters left: {50 - this.state.tripNameLength}</p>}
                        {this.state.tripNameError && <p className="error-font" aria-live="polite">{this.state.tripNameError}</p>}
                    </div>

                    <div className="form-component-wrapper">
                        <label htmlFor="trip-tags">Tags (Comma separated keywords)</label>
                        <TexInput placeholder="city, urban architecture" id="trip-tags" value={this.state.newTripTags} onChange={(e) => this.handleTripTagsInput(e)} />
                        {this.state.tripTagsError && <p className="error-font" aria-live="polite">{this.state.tripTagsError}</p>}
                    </div>

                    <fieldset className="form-component-wrapper">
                        <legend>Visibility Settings</legend>
                        <RadioButton onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Public" defaultChecked name="trip-privacy" value="public" />
                        <label className="caption-font" htmlFor="public">Anyone on Photo Atlas</label>
                        <RadioButton onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Private" name="trip-privacy" value="private" />
                        <label className="caption-font" htmlFor="private">Only you and those you share this trip with</label>
                    </fieldset>

                    <div className="form-component-wrapper">
                        <SubmitButton onClick={(e) => this.createNewTrip(e)} value={`${this.state.creatingTrip ? 'Creating Trip...' : 'Create Trip'}`} />
                    </div>


                </form>

                {this.state.existingTrips.length > 0 &&
                    <div className="modal-content-padding">
                        <button onClick={() => this.switchForm()} className="secondary-button back-button">Back to Existing Trips</button>
                    </div>
                }
            </>
        )

    }

    newTripCreated() {
        return (
            <div className="modal-content-padding center-text">
                <h3 className="h5-font center-text">
                    This location was added to your new trip.
                </h3>
            </div>
        )

    }

    createNewTrip(e) {
        e.preventDefault();

        this.setState(
            {
                errorCreatingTrip: '',
                errorCreatingLocation: '',
                errorUpdatingUserTrips: ''
            }
        )

        if (!this.state.newTripName) {
            this.setState({ tripNameError: 'Please name your trip.' })
        }

        if (!this.state.tripNameError && this.state.newTripName && !this.state.tripTagsError) {
            this.setState({ creatingTrip: true })

            let locationId = this.props.locationId;
            let locationPhotosArray = this.props.photos;
            let locationName = locationPhotosArray[0].title;
            let locationCoordinates = this.props.coordinates;
            let locationFiltersArray = this.props.filters;

            // arrays are handled like objects on Firebase Realtime Database
            //https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
            //convert props arrays into objects for better database handling
            let locationFilters = {};
            let locationPhotos = {};

            locationPhotosArray.forEach(photo => {
                let flickrId = photo.flickrId;
                let photoId;
                if (flickrId) {
                    photoId = `flickrPhoto-${flickrId}`
                }

                locationPhotos[photoId] = {
                    title: photo.title,
                    author: photo.author,
                    src: photo.src,
                    creditUrl: photo.creditUrl ? photo.creditUrl : null
                }
            }
            )


            locationFiltersArray.forEach(filter => {

                locationFilters[filter] = true

            });

            let tripPrivacy = this.state.newTripPrivacy;
            let tripName = this.state.newTripName;
            let tripFeaturedImg = locationPhotosArray[0];
            let tripFeaturedImgSrc = tripFeaturedImg.src;
            let tripAuthor = this.state.userId;
            let tripTags = this.state.newTripTags;
            if (tripTags.endsWith(",") || tripTags.endsWith(" ,")) {
                tripTags = tripTags.slice(0, -1)
            }
            let date = generateDate();
            let time = generateTimeNumber();
            let tripId = generateID(7, `trip-${date}`, `${time}`)

            let locations = {}
            locations[locationId] = true;

            let database = firebase.database();




            // create new trip
            database.ref(`${tripPrivacy}Trips/` + tripId).set({
                tripName: tripName,
                featuredImg: tripFeaturedImgSrc,
                author: tripAuthor,
                loacationsCount: 1,
                locations: locations,
                tags: tripTags,
                createdOn: date,
                lastEdited: date
            }).catch((error) => {
                this.setState({ errorCreatingTrip: `Could not create trip: ${error.message}` })
            }).then(() => {
                //add trips to user trips
                database.ref(`userTrips/${tripAuthor}/${tripId}`).set({
                    tripName: tripName,
                    featuredImg: tripFeaturedImgSrc,
                    tripPrivacy: tripPrivacy,
                    locationsCount: 1
                }).catch((error) => {
                    this.setState({ errorUpdatingUserTrips: `Could to your list of trips: ${error.message}` })
                });
            }).then(() => {
                if (locationId.startsWith("flickr-")) { // check if primary source is from flickr or user created

                    let locationRef = `appLocations/flickrSourced/${locationId}`;

            //check if location exists in lists of locations if not, then add location
            //https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions

                    database.ref(locationRef).transaction((location) => {
                        if (location) {
                            //if this author has not saved this location before, add them to the list of saved
                            if (!location.savedBy[tripAuthor]) {
                                location.savedBy[tripAuthor] = true;
                                if (location.savedCount) {
                                    location.savedCount++;
                                } else {
                                    location.savedCount = 1;
                                }
                            }
                        } else {
                            //create the location
                            let savedBy = {};
                            savedBy[tripAuthor] = true;

                            database.ref(locationRef).set({
                                locationName: locationName,
                                photos: locationPhotos,
                                coordinates: locationCoordinates,
                                savedCount: 1,
                                savedBy: savedBy,
                                filters: locationFilters,
                                addedDate: date,
                                curated: false, //indicates that app has not been curated by a PhotoAtlas user
                                userLastEditedDate: null
                            }).catch(
                                (error) => {
                                    this.setState({ errorCreatingLocation: `Could not add location to database: ${error.message}` })
                                }
                            );

                        }
                    })
                } 

            }).then(() =>{
                //TODO //IMPORTANT HEY DON'T FOGET THIS
                console.log("add filters to filters node of database")
            }

            ).then( () => {

            if (!this.state.errorCreatingTrip && !this.state.errorCreatingLocation && !this.state.errorUpdatingUserTrips) {
                this.setState({
                    creatingTrip: false,
                    newTripCreated: true,
                    modalTitle: 'You have a New Trip',
                    modalDescription: ''
                })
            } else {
                this.setState({
                    creatingTrip: false
                })
            }
            })

        }

    }

    addOrRemoveFromTrip(inTrip) {
        if (inTrip) {
            console.log('removed')
            //update existingTrips
        }
        else {
            console.log('added')
            //update existingTrips
        }
    }

    handleNewTripPrivacy(e) {
        this.setState({ newTripPrivacy: e.target.value }, () => console.log(this.state.newTripPrivacy))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {
            modalTitle,
            modalDescription
        } = this.state;

        return (
            <Modal
                modalId='manage-trips-modal'
                modalTitle={modalTitle}
                modalDescription={modalDescription}
                isOpen={this.props.isOpen}
                handleClose={() => this.closeModal()}
            >
                {this.renderModalContent()}
            </Modal>
        )
    }
}

export default ManageTripsModal;