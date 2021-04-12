import React from 'react'

import firebase from '../../utils/firebase/firebaseConfig'
import Authenticate from '../../screens/authentication/Authenticate'
import Modal from './Modal'
import TexInput from '../forms/TextInput'
import SubmitButton from '../forms/SubmitButton'
import RadioButton from '../forms/RadioButton'
import { generateDate, generateTimeNumber } from '../../utils/generateDateAndTime'
import generateID from '../../utils/generateId'
import getUserTrips from '../../utils/getUserTrips'

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
        errorUpdatingUserTrips: '',
        errorAddingFilters: '',
        updatingTrips: true
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
            errorUpdatingUserTrips: '',
            errorAddingFilters: '',
            needNewTrip: false
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

    checkExistingTrips(userId) {
        
        this.setState({ updatingTrips: true })

        this._isMounted && 
        getUserTrips(userId,  (existingTrips) => this.setState({ existingTrips: existingTrips, updatingTrips: false }), this.props.locationId)
    }



    checkAuth() {

        let userId = this.props.userId;

        if(!userId) {
            let user = firebase.auth().currentUser;
            if(user) {
                userId = user.uid;
            } 
        }


        if (this._isMounted) {


            if (userId) {

           
                //get user trips
                this._isMounted && this.checkExistingTrips(userId);

                this.setState({ isAuthenticated: true, userId: userId })

                if (this.state.existingTrips.length < 1) {
                    this.setState(
                        {
                            modalTitle: 'Save to a New Trip',
                            modalDescription: '',
                            updatingTrips: false
                        }
                    )
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


    componentDidUpdate(prevProps) {
        this._isMounted = true;
        // Typical usage (don't forget to compare props):
        if (this.props.locationId !== prevProps.locationId) {
            this.checkAuth();
        }
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

            if (this.state.updatingTrips) {
                return (
                    <div className="modal-content-padding center-text">
                        <p>Updating trips...</p>
                    </div>)

            } else {
                if (this.state.existingTrips.length > 0 && !this.state.needNewTrip && !this.state.newTripCreated) {
                    return this.selectExistingTrip();
                }
                else {
                    if (!this.state.newTripCreated && !this.state.updatingTrips) {
                        return this.getNewTripInfo();
                    } else {

                        return this.newTripCreated()


                    }
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



        return (<ul className="existing-trips">
            {existingTrips.map((trip, index) => {
                let {
                    thumbnail,
                    title,
                    locationsCount,
                    privacy,
                    tripId,
                    inTrip } = trip;

                return (
                    <li key={index} className="trip-card-small">
                        <div className={`trip-card-image`}>
                            <img src={thumbnail} alt="" />
                        </div>
                        <div className={`trip-card-content`}>
                            <p className={`title`}>{title}</p>
                            <p className={`meta-data ${privacy}`}>
                                {privacy}</p>
                            <p className={`meta-data marker`}>
                                {locationsCount} {(locationsCount > 1 || locationsCount < 1) ? 'Locations' : 'Location'}</p>
                            <button className="add-or-remove" onClick={() => { this.addOrRemoveFromTrip(tripId, privacy) }}>
                                {inTrip ? '- Remove' : '+ Add'}
                                <span>{inTrip ? `from ${title}` : `to ${title}`}</span>
                            </button>
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
            this.state.errorCreatingTrip ||
            this.state.errorAddingFilters
        ) {
            return (
                <div className="error-font" aria-live="polite">
                    <ul>
                        {this.state.errorCreatingTrip && <li>{this.state.errorCreatingTrip}</li>}
                        {this.state.errorUpdatingUserTrips && <li >{this.state.errorUpdatingUserTrips}</li>}
                        {this.state.errorCreatingLocation && <li>{this.state.errorCreatingLocation}</li>}
                        {this.state.errorAddingFilters && <li>{this.state.errorAddingFilters}</li>}
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
                        <label htmlFor="trip-tags">Tags (Comma separated)</label>
                        <TexInput placeholder="city, urban architecture" id="trip-tags" value={this.state.newTripTags} onChange={(e) => this.handleTripTagsInput(e)} />
                        {this.state.tripTagsError && <p className="error-font" aria-live="polite">{this.state.tripTagsError}</p>}
                    </div>

                    <fieldset className="form-component-wrapper">
                        <legend>Visibility Settings</legend>
                        <RadioButton onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Public" defaultChecked name="trip-privacy" value="public" />
                        <label className="caption-font" htmlFor="public">Anyone can see</label>
                        <RadioButton onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Private" name="trip-privacy" value="private" />
                        <label className="caption-font" htmlFor="private">Only you can see</label>
                        <RadioButton onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Shareable" name="trip-privacy" value="shareable" />
                        <label className="caption-font" htmlFor="shareable">Anyone with a link can see</label>
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

    createNewFlickrSourcedLocation(locationRef) {
        let database = firebase.database();
        let locationId = this.props.locationId;
        let locationPhotosArray = this.props.photos;
        let locationName = locationPhotosArray[0].title;
        let locationCoordinates = this.props.coordinates;
        let locationSubjectsArray = this.props.subjects;
        let date = generateDate();

        // arrays are handled like objects on Firebase Realtime Database
        //https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
        //convert props arrays into objects for better database handling
        let locationSubjects = {};
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


        locationSubjectsArray.forEach(subject => {

            locationSubjects[subject] = true

        });

        database.ref(`${locationRef}`).set({
            locationName: locationName,
            photos: locationPhotos,
            coordinates: locationCoordinates,
            savedCount: 1,
            subjects: locationSubjects,
            addedDate: date,
            curated: false, //indicates that app has not been curated by a PhotoAtlas user
            userLastEditedDate: null,
            woeId: this.props.woeId
        }).then(() => {

            // add subjects record
            locationSubjectsArray.forEach(

                subject => {

                    let subjectRef = subject;

                    let update = {};

                    update[locationId] = true;

                    database.ref(`subjects/${subjectRef}`).update(
                        update
                    ).catch(
                        (error) => {
                            this.setState({ errorAddingFilter: `Could not add all filters to database: ${error.message}` })
                        });

                })

        }).catch(
            (error) => {
                this.setState({ errorCreatingLocation: `Could not add location to database: ${error.message}` })
            }
        )

    }

    createNewTrip(e) {
        e.preventDefault();

        this.setState(
            {
                errorCreatingTrip: '',
                errorCreatingLocation: '',
                errorUpdatingUserTrips: '',
                errorAddingFilters: ''
            }
        )

        if (!this.state.newTripName) {
            this.setState({ tripNameError: 'Please name your trip.' })
        }

        if (!this.state.tripNameError && this.state.newTripName && !this.state.tripTagsError) {
            this.setState({ creatingTrip: true })

            let locationId = this.props.locationId;
            let locationPhotosArray = this.props.photos;

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
                locationsCount: 1,
                locations: locations,
                tags: tripTags,
                createdOn: date,
                lastEdited: date
            }).catch((error) => {
                this.setState({ errorCreatingTrip: `Could not create trip: ${error.message}` })
            }).then(() => {
                //add trip to user trips
                database.ref(`userTrips/${tripAuthor}/${tripId}`).set({
                    tripPrivacy: tripPrivacy
                }).catch((error) => {
                    this.setState({ errorUpdatingUserTrips: `Could to your list of trips: ${error.message}` })
                });
            }).then(() => {
                if (locationId.startsWith("flickr-")) { // check if primary source is from flickr or user created

                    let locationRef = `appLocations/flickrSourced/${locationId}`;

                    //check if location exists in lists of locations if not, then add location
                    //use transactions to make sure that count stays accurate
                    //https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions

                    database.ref(`${locationRef}`).get().then((snapshot) => {
                        //if location exists
                        if (snapshot.exists()) {
                            //get how many people have saved it, and who has saved it
                            let savedCount = snapshot.val().savedCount;

                            //add to the saved count 
                            //and add the author
                            if (savedCount) {
                                database.ref(`${locationRef}`).transaction(
                                    (location) => {
                                        if (location) {
                                            location.savedCount++;
                                        }
                                        return location;
                                    }
                                )
                            }

                        }
                        else {
                            //create the location
                            this.createNewFlickrSourcedLocation(locationRef);
                        }
                    })
                }

            }).then(() => {

                if (!this.state.errorCreatingTrip && !this.state.errorCreatingLocation && !this.state.errorUpdatingUserTrips && !this.state.errorAddingFilters) {
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
            }).then(
                () => this.checkExistingTrips(this.state.userId)
            )

        }

    }

    addOrRemoveFromTrip(tripId, privacy) {

        this.setState({ updatingTrips: true })

        let database = firebase.database();
        let currentLocation = this.props.locationId;
        let user = this.state.userId;
        let date = generateDate();

        let tripRef = `${privacy}Trips/${tripId}/`
        //need to change
        //last edited
        //locationsCount
        //locations

        let locationRef = `appLocations/flickrSourced/${currentLocation}`
        //need to change savedCount


        database.ref(`${tripRef}/locations/${currentLocation}`).get().then(
            snapshot => {

                if (snapshot.exists()) {
                    //remove

                    database.ref(`${tripRef}`).transaction(
                        trip => {
                            if (trip) {
                                //decrease locationsCount
                                if (trip.locationsCount > 0) {
                                    trip.locationsCount--;
                                }
                                //change the last edited
                                trip.lastEdited = date;

                            }
                            return trip
                        }).catch((error) => console.log(error)).then(() => {
                            //remove location from trip
                            database.ref(`${tripRef}/locations/${currentLocation}`).transaction(
                                location => {
                                    if (location) {
                                        location = null
                                    }
                                    return location
                                }
                            )
                        }).then(() => this.checkExistingTrips(user))

                    database.ref(`${locationRef}`).transaction(
                        location => {
                            if (location) {
                                //decrease savedCount

                                location.savedCount--


                            }
                            return location
                        }).catch((error) => console.log(error))


                }
                else {
                    //add
                    if (currentLocation.startsWith("flickr-")) {
                        let locationRef = `appLocations/flickrSourced/${currentLocation}`

                        database.ref(`${locationRef}`).get().then(
                            (snapshot) => {
                                if (!snapshot.exists()) {
                                    this.createNewFlickrSourcedLocation(locationRef)
                                }
                            }
                        )
                    }

                    database.ref(`${tripRef}`).transaction(
                        trip => {
                            if (trip) {
                                //increase locationsCount
                                trip.locationsCount++;
                                //change the last edited
                                trip.lastEdited = date;
                            }
                            return trip
                        }).catch((error) => console.log(error)).then(() => {
                            //add location to trip
                            //check if trip has locations
                            database.ref(`${tripRef}/locations`).get().then((snapshot) => {
                                if (snapshot.exists()) {
                                    let update = {}
                                    update[currentLocation] = true

                                    database.ref(`${tripRef}/locations`).update(
                                        update
                                    ).catch((error) => console.log(error))
                                } else {
                                    let update = { locations: {} }
                                    update.locations[currentLocation] = true

                                    database.ref(`${tripRef}`).update(
                                        update
                                    ).catch((error) => console.log(error))
                                }

                            }).then(() => this.checkExistingTrips(user))

                        })


                    database.ref(`${locationRef}`).transaction(
                        location => {
                            if (location) {
                                //increase savedCount
                                location.savedCount++
                            }
                            return location
                        }).catch((error) => console.log(error))

                }
            }).then(() => this.setState({ updatingTrips: false }))
    }

    handleNewTripPrivacy(e) {
        this.setState({ newTripPrivacy: e.target.value })
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