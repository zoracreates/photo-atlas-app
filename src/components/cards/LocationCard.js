import PropTypes from 'prop-types';
import React from 'react';
import GoogleCalculateDistance from '../../utils/GoogleCalculateDistance';
import { Link } from 'react-router-dom'

class LocationCard extends React.Component {

    state = {
        distance: ""
    }

    render() {
        let {
            thumbnail,
            title,
            saves,
            origin,
            destination,
            src,
            locationId,
            woeId } = this.props;
        
        let {distance} = this.state;

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
                    <p className={`meta-data saved`}>Saved by: {saves} {(saves > 1 || saves < 1) ? 'photographers' : 'photographer'}</p>
                    {distance && <p className={`meta-data distance`}>Driving distance: {distance}</p>}
                </div>
                <GoogleCalculateDistance 
                    destination={destination}
                    origin={origin}

                    handleResponse={
                        (response) =>{
                            let row, element, distance;
                             
                            row = response.rows[0]
                             
                             if(row) {
                                 element = row.elements[0]
                             }

                             if(element) {
                                 distance = element.distance
                             }

                            if(distance) {
                                distance = distance.text
                                this.setState({distance: distance}) 
                            }
                            
                        }
                    }

                /> 

            </Link>
        )

    }

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