import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'


function TripCard(props) {

    let {
        thumbnail,
        title,
        tripId,
        isPublic,
        isShared,
        locationCount } = props;

    return (
        <Link className={`trip-card`} to={ `/trip/${tripId}`}>

            <div className={`trip-card-image`}>
                <img src={thumbnail} alt="" />
            </div>
            <div className={`trip-card-content`}>
                <p className={`title`}>{title}</p>
                <p className={`meta-data ${isPublic ? 'public' : 'private'}`}>
                    {isPublic ? 'Public' : isShared ? 'Shared' : 'Private'}</p>
                <p className={`meta-data marker`}>
                   {locationCount} {locationCount > 1 ? 'Locations' : 'Location'}</p>
            </div>

        </Link>
    )

}

TripCard.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    isPublic: PropTypes.bool,
    locationCount: PropTypes.number,
    tripId: PropTypes.string,
    isShared: PropTypes.bool
}


export default TripCard;