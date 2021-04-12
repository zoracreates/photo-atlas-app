import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'
import firebase from '../../utils/firebase/firebaseConfig'


class TripCard extends React.Component{
    
    state = {
        authorName: ''
    }
    _isMounted = false;

    getAuthor = (authorId) =>{
        let database = firebase.database()
        database.ref(`users/${authorId}/displayName`).get().catch(error=>console.log(error)).then(
           snapshot => {
               if(snapshot){
                   let authorName = snapshot.val()
                   this._isMounted && this.setState({authorName: authorName})
               }
           }
        )
    }

    componentDidMount() {
        this._isMounted = true
        this.getAuthor(this.props.authorId)
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    
    
    render() {

        let {
            thumbnail,
            title,
            tripId,
            privacy,
            locationsCount } = this.props;

    
        return (
            <Link className={`trip-card`} to={ `/trip/${tripId}?privacy=${privacy}`}>
    
                <div className={`trip-card-image`}>
                    <img src={thumbnail} alt="" />
                </div>
                <div className={`trip-card-content`}>
                    <p className={`title`}>{title}</p>
                    <p className={`meta-data`}>by {this.state.authorName}</p>
                    <p className={`meta-data ${privacy}`}>
                        {privacy}</p> 
                    <p className={`meta-data marker`}>
                       {locationsCount} {(locationsCount > 1 || locationsCount < 1) ? 'Locations' : 'Location'}</p>
                </div>
    
            </Link>
        )
    

    }
}

TripCard.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    isPublic: PropTypes.bool,
    locationCount: PropTypes.number,
    tripId: PropTypes.string,
    authorId: PropTypes.string,
    isShared: PropTypes.bool
}


export default TripCard;