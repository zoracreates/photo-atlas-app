import React from 'react'
import Modal from './Modal'
import TexInput from '../forms/TextInput'
import SubmitButton from '../forms/SubmitButton'
import RadioButton from '../forms/RadioButton'
import firebase from '../../utils/firebase/firebaseConfig'
import { generateDate } from '../../utils/generateDateAndTime'

class EditTripModal extends React.Component {

    state = {
        errorUpdatingTrip: '',
        errorUpdatingUserTrips: '',
        tripNameError: '',
        tripNameLength: 0,
        tripName: '',
        nameUpdated: false,
        tripTags: '',
        tagsUpdated: false,
        tripTagsError: '',
        tripPrivacy: this.props.originalTripPrivacy,
        updatingTrip: false,
        tripUpdate: false,
        confirmDelete: false,
        tripDeleted: false,
        tagButtons: ''
    }

    _isMounted = false;




    updateTrip(e) {
        //update userTrips
        //update trip
        e.preventDefault();


        if (!this.state.errorUpdatingTrip &&
            !this.state.errorUpdatingUserTrips &&
            !this.state.tripNameError &&
            !this.state.tripTagsError
        ) {

            this.setState({ updatingTrip: true })
            let database = firebase.database()
            let userId = this.props.userId;
            let tripId = this.props.tripId;
            let originalPrivacy = this.props.originalTripPrivacy;


            let tripRef = `${originalPrivacy}Trips/${tripId}`
            let userTripRef = `userTrips/${userId}/${tripId}`

            let newPrivacy = this.state.tripPrivacy
            let tripUpdate = {}


            if (this.state.tripName && (this.state.tripName !== this.props.originalTripName)) {
                tripUpdate["tripName"] = this.state.tripName
            }

            //this gets buggy when I update tags plus it's not refreshing the update...
            if (this.state.tagsUpdated && (this.state.tripTags !== this.props.originalTripTags)) {
                tripUpdate["tags"] = this.state.tripTags
            }

            //update trip name and tags
            if (tripUpdate || newPrivacy) {
                tripUpdate.lastEdited = generateDate()


                //if the new privacy is private, then delete existing bookmarks

                if (newPrivacy === 'private') {
                    //get the existing bookmarks, and delete them from path
                    this.deleteBookmarks(
                        tripRef,
                        tripId,
                        () => {
                            database.ref(`${tripRef}/bookmarks`).remove().catch(error => {
                                this.setState({ errorUpdatingTrips: `When deleting bookmarks ${error}` })
                            })
                        }
                    )
                }


                database.ref(`${tripRef}`).update(tripUpdate).catch(error => {
                    this.setState({ errorUpdatingTrip: error })
                }).then(() => {
                    if (this.state.tripPrivacy) {
                        let userTripsUpdate = {
                            tripPrivacy: newPrivacy
                        }
                        //update userTrips
                        database.ref(`${userTripRef}`).update(userTripsUpdate).catch(error => {
                            this.setState({ errorUpdatingUserTrips: error })
                        })

                        //get trip from current spot and store it
                        let tripData;
                        database.ref(`${tripRef}`).get().then(
                            (snapshot) => {
                                tripData = snapshot.val()
                            }
                        ).catch(error => {
                            this.setState({ errorUpdatingUserTrips: `When getting original privacy setting ${error}` })
                        }).then(() => {
                            //delete trip from current spot
                            database.ref(`${tripRef}`).remove().catch(error => {
                                this.setState({ errorUpdatingUserTrips: `When deleting original privacy setting ${error}` })
                            })
                        }).then(() => {
                            //add trip under new privacy
                            let tripRef = `${newPrivacy}Trips/${tripId}`
                            database.ref(`${tripRef}`).set(
                                tripData
                            ).catch(error => {
                                this.setState({ errorUpdatingUserTrips: `When setting new privacy setting ${error}` })
                            })
                        }).then(() =>
                            //inidicate update finished
                            this.setState({ updatingTrip: false, tripUpdate: true }))
                    } else {
                        //if privacy was not changed, simply indicate update done
                        this.setState({ updatingTrip: false, tripUpdate: true })
                    }
                })

            }

        }


    }

    tripDeleted() {
        return (
            <div className="modal-content-padding center-text">
                <h3 className="h5-font center-text">
                    This trip has been deleted.
                </h3>
            </div>
        )

    }

    tripUpdated() {
        return (
            <div className="modal-content-padding center-text">
                <h3 className="h5-font center-text">
                    Trip information updated.
                </h3>
            </div>
        )

    }

    renderDatabaseErrors() {
        if (
            this.state.errorUpdatingUserTrips ||
            this.state.errorUpdatingTrip
        ) {
            return (
                <div className="error-font" aria-live="polite">
                    <ul>
                        {this.state.errorUpdatingTrip && <li>Issue updating trip: {this.state.errorUpdatingTrip}</li>}
                        {this.state.errorUpdatingUserTrips && <li> Issue updating user trips: {this.state.errorUpdatingUserTrips}</li>}
                    </ul>
                </div>
            )
        }
    }

    deleteBookmarks(tripRef, tripId, callback) {
        let database = firebase.database();

        //first delete bookmar references, then delete the trip
        database.ref(`${tripRef}/bookmarks`).get().catch(error => {
            this.setState({ errorUpdatingTrips: `When deleting trip bookmarks ${error}` })
        }).then(snapshot => {
            if (snapshot) {
                let bookmarks = snapshot.val()

                for (const userId in bookmarks) {
                    database.ref(`userBookmarks/${userId}/${tripId}`).remove().catch(error => {
                        this.setState({ errorUpdatingTrips: `When deleting trip ${error}` })
                    })
                }
            }
        }).then(() => {
            if (callback) {
                callback()
            }
        })

    }

    deleteTrip() {
        let database = firebase.database();
        let userId = this.props.userId;
        let tripId = this.props.tripId;
        let originalPrivacy = this.props.originalTripPrivacy;
        let tripRef = `${originalPrivacy}Trips/${tripId}`
        let userTripRef = `userTrips/${userId}/${tripId}`

        this.deleteBookmarks(
            tripRef,
            tripId,
            () => {
                database.ref(`${tripRef}`).remove().catch(error => {
                    this.setState({ errorUpdatingTrips: `When deleting trip ${error}` })
                }).then(
                    () => {
                        database.ref(`${userTripRef}`).remove().catch(error => {
                            this.setState({ errorUpdatingUserTrips: `When deleting trip from user trips list: ${error}` })
                        })
                    }
                ).then(
                    () => {
                        this.setState({ tripDeleted: true })
                    }
                )
            }
        )
    }

    toggleDeleteFrom() {
        this.setState({ confirmDelete: !this.state.confirmDelete })
    }


    componentDidUpdate(prevProps) {
        if (this.props.originalTripPrivacy !== prevProps.originalTripPrivacy) {
            this.setState({ tripPrivacy: this.props.originalTripPrivacy })
        }

    }

    renderUpdateForm() {
        let pathQuery = this.props.searchQuery;
        let searchParams = new URLSearchParams(pathQuery);
        let searchPrivacy = searchParams.get("privacy")
        let privacy = this.state.tripPrivacy ? this.state.tripPrivacy : searchPrivacy;

        let defaultPrivate = privacy === 'private'
        let defaultPublic = privacy === 'public'
        let defaultShareable = privacy === 'shareable'

        return (
            <>
                {this.renderDatabaseErrors()}

                <form className="modal-content-padding">
                    <div className="form-component-wrapper">
                        <label htmlFor="trip-name">Title (Max 50 Characters)</label>
                        <TexInput id="trip-name"
                            value={this.state.nameUpdated ? this.state.tripName : this.props.originalTripName}
                            onChange={(e) => this.handleTripNamelInput(e)}
                            required />
                        {this.state.tripNameLength !== 0 && <p className="character-count" aria-live="polite">Characters left: {50 - this.state.tripNameLength}</p>}
                        {this.state.tripNameError && <p className="error-font" aria-live="polite">{this.state.tripNameError}</p>}
                    </div>

                    <div className="form-component-wrapper">
                        <label htmlFor="trip-tags">Tags (Comma separated)</label>
                        <TexInput id="trip-tags"
                            value={this.state.tagsUpdated ? this.state.tripTags : this.props.originalTripTags}
                            onChange={(e) => this.handleTripTagsInput(e)} />
                        {this.state.tripTagsError && <p className="error-font" aria-live="polite">{this.state.tripTagsError}</p>}
                    </div>

                    <fieldset className="form-component-wrapper">
                        <legend>Visibility Settings</legend>

                        <RadioButton
                            defaultChecked={defaultPublic}
                            onChange={(e) => this.handleTripPrivacy(e)}
                            labelText="Public"
                            name="trip-privacy"
                            value="public" />

                        <label className="caption-font" htmlFor="public">Anyone can see</label>

                        <RadioButton
                            defaultChecked={defaultPrivate}
                            onChange={(e) => this.handleTripPrivacy(e)}
                            labelText="Private"
                            name="trip-privacy"
                            value="private" />
                        <label className="caption-font" htmlFor="private">Only you can see</label>

                        <RadioButton
                            defaultChecked={defaultShareable}
                            onChange={(e) => this.handleTripPrivacy(e)}
                            labelText="Shareable"
                            name="trip-privacy"
                            value="shareable" />
                        <label className="caption-font" htmlFor="shareable">Anyone with a link can see</label>

                    </fieldset>

                    <div className="form-component-wrapper">
                        <SubmitButton onClick={(e) => this.updateTrip(e)} value={`${this.state.updatingTrip ? 'Updating Trip...' : 'Update Trip'}`} />
                    </div>

                </form>

                {
                    <div className="modal-content-padding">
                        <button onClick={() => this.toggleDeleteFrom()} className="secondary-button delete-button">Delete Trip</button>
                        {this.state.confirmDelete && <div>
                            <ul className="button-group">
                                <li><button onClick={() => this.deleteTrip()} className="default-button">Delete</button></li>
                                <li><button onClick={() => this.toggleDeleteFrom()} className="button-link">Cancel</button></li>
                            </ul>
                        </div>}
                    </div>
                }
            </>
        )

    }

    handleTripNamelInput(e) {
        e.preventDefault();
        let value = e.target.value;
        let valueLength = value.length;

        this.setState({
            nameUpdated: true,
            tripName: e.target.value,
            tripNameLength: valueLength,
            tripNameError: ""
        })
        if (valueLength === 0) {
            this.setState({
                tripNameError: "Your trip must have a name."
            })
        }
        if (valueLength > 50) {
            this.setState({
                tripNameError: "Your trip name is too long."
            })
        }
    }

    handleTripTagsInput(e) {
        e.preventDefault();

        this.setState({
            tagsUpdated: true,
            tripTags: e.target.value,
            tripTagsError: ""
        }, () => {
            //check if tags have special characters other than comma
            let testString = /^[a-zA-Z ,0-9]+$/;

            if (this.state.tripTags && !testString.test(this.state.tripTags)) {
                this.setState({
                    tripTagsError: "Tags may only contain letters, numbers, and commas"
                })
            }
        });

    }

    handleTripPrivacy(e) {
        this.setState({ tripPrivacy: e.target.value })
    }


    renderModalContent() {
        if (this.state.tripDeleted) {
            return this.tripDeleted()
        } else {
            if (!this.state.tripUpdate ||
                this.state.errorUpdatingTrip ||
                this.state.errorUpdatingUserTrips ||
                this.state.tripNameError ||
                this.state.tripTagsError) {
                return this.renderUpdateForm()
            } else {
                return this.tripUpdated()
            }
        }

    }

    closeModal() {

        //if the trip was updated
        //reset the state of the modal
        //and tell the parent of the update
        //else close the modal and indate that the update did not happen

        let update = {}

        if (!this.state.tripDeleted) {

            if (this.state.tripUpdate) {

                let originalPrivacy = this.props.originalTripPrivacy
                let newPrivacy = this.state.tripPrivacy


                if (newPrivacy && (newPrivacy !== originalPrivacy)) {
                    update = {
                        updated: true,
                        newPrivacy: newPrivacy
                    }
                } else {
                    update = {
                        updated: true
                    }
                }

            } else {
                update = { updated: false }
            }

            this.setState({ tripUpdate: false, nameUpdated: false, tagsUpdated: false },
                () => this.props.handleClose(update))

        } else {
            update = { updated: true, deleted: true }
            this.props.handleClose(update)
        }

    }


    render() {
        return (

            <Modal
                modalId='edit-trip-modal'
                modalTitle={'Update Trip'}
                isOpen={this.props.isOpen}
                handleClose={() => this.closeModal()}
            >
                {this.renderModalContent()}
            </Modal>


        )
    }

}

export default EditTripModal;
