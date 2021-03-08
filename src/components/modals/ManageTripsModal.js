import React from 'react'

import firebase from '../../utils/firebase/firebaseConfig'
import Authenticate from '../../screens/authentication/Authenticate'
import Modal from './Modal'
import TexInput from '../forms/TextInput'
import SubmitButton from '../forms/SubmitButton'
import RadioButton from '../forms/RadioButton'

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
        existingTrips: [],
        newTripPrivacy: 'public',
        newTripName: '',
        newUser: false,
        creatingTrip: false,
        tripNameLength: 0,
        tripNameError: '',
        newTripCreated: false,
        needNewTrip: false
    }

    _isMounted = false;

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

            if(!user) {
                user = firebase.auth().currentUser;
            }

            if (user) {
                this.setState({ isAuthenticated: true })
           
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
                        afterSignIn={(user)=> this.checkAuth(user)}
                        afterCreateAccount={(user)=> this.checkAuth(user)}
                    
                     />
                </div>
            )
        } else {
            //if user has trips 
            if (this.state.existingTrips.length > 0 && !this.state.needNewTrip) {
                return this.selectExistingTrip();
            }
            else {
                if(!this.state.newTripCreated) {
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
                    <button onClick={()=>this.switchForm()} className="button-link"> + Create a New Trip</button>
                </div>

            </>
        )
    }

    switchForm() {
        this.setState({needNewTrip: !this.state.needNewTrip})
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
        if(valueLength > 50) {
            this.setState({
                tripNameError: "Your trip name is too long."
            })
        }     
    }




    getNewTripInfo() {
        return (
            <>
                <h3 className="h5-font center-text">Create a New Trip</h3>
                <form className="modal-content-padding">
                    <div className="form-component-wrapper">
                        <label htmlFor="trip-name">Trip Name (Max 50 Characters)</label>
                        <TexInput id="trip-name" value={this.state.newTripName} onChange={(e) => this.handleTripNamelInput(e)} required />
                        {this.state.tripNameLength !== 0 && <p className="character-count" aria-live="polite">Characters left: {50 - this.state.tripNameLength}</p>}
                        {this.state.tripNameError && <p className="error-font" aria-live="polite">{this.state.tripNameError}</p>}
                    </div>

                    <fieldset className="form-component-wrapper">
                    <legend>Visibility Settings</legend>
                        <RadioButton onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Public" defaultChecked name="trip-privacy" value="public"/>
                        <label className="caption-font" htmlFor="public">Anyone on Photo Atlas</label>
                        <RadioButton  onChange={(e) => this.handleNewTripPrivacy(e)} labelText="Private" name="trip-privacy" value="private"/>
                        <label className="caption-font" htmlFor="private">Only you and those you share this trip with</label>
                    </fieldset>


                    <div className="form-component-wrapper">
                        <SubmitButton onClick={(e)=>this.createNewTrip(e)} value={`${this.state.creatingTrip ? 'Creating Trip...' : 'Create Trip'}`} />
                    </div>


                </form>

                {this.state.existingTrips.length > 0 &&
                <div className="modal-content-padding">
                    <button onClick={()=>this.switchForm()} className="secondary-button back-button">Back to Existing Trips</button>
                </div>
                } 
            </>
        )

    }

    newTripCreated() {  
        return(
            <div className="modal-content-padding center-text">
            <h3 className="h5-font center-text">
                This location was added to your new trip.
            </h3>
            </div>
        )

    }

    createNewTrip(e){
        e.preventDefault();
        if(!this.state.newTripName) {
            this.setState({tripNameError: 'Please name your trip.'})
        }
        if(!this.state.tripNameError && this.state.newTripName) {
            this.setState({creatingTrip: true})
            console.log('created trip')
            this.setState({
                creatingTrip: false,
                newTripCreated: true,
                modalTitle: 'You have a New Trip',
                modalDescription: ''
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
        this.setState({newTripPrivacy: e.target.value},() => console.log(this.state.newTripPrivacy))
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
                handleClose={this.props.handleClose}
            >
                {this.renderModalContent()}
            </Modal>
        )
    }
}

export default ManageTripsModal;