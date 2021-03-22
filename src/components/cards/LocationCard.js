import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'


function LocationCard(props) {

    let {
        thumbnail,
        title,
        saves,
        src,
        locationId,
        woeId } = props;
    
    if (!saves) {
        saves = 0;
    }

    if (!title) {
        title = "Unamed Location"
    }

    let titleLength = title.length;

    //keep the lenght of the title at 45 characters
    if (titleLength > 45) {
        let extraChars = 45 - titleLength;
        let slicedTitle = title.slice(0, extraChars);
        let lastSpace = slicedTitle.lastIndexOf(" ");
        slicedTitle = slicedTitle.slice(0, lastSpace);
        title = `${slicedTitle}...`
    }

    return (
        <Link className={`location-card`} to={ `/location/${src}-${locationId}?woe=${woeId}`}>

            <div className={`location-card-image`}>
                <img src={thumbnail} alt="" />
            </div>
            <div className={`location-card-content`}>
                <p className={`title`}>{title}</p>
                <p className={`meta-data saved`}>Saved in: {saves} {(saves > 1 || saves < 1) ? 'trips' : 'trip'}</p>
            </div>

        </Link>
    )

}

LocationCard.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    saves: PropTypes.number,
    destination: PropTypes.object,
    origin: PropTypes.object,
    src: PropTypes.string,
    locationId: PropTypes.string,
    woeId: PropTypes.string
}


export default LocationCard;