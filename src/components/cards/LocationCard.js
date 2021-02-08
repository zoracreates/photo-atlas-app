import PropTypes from 'prop-types';
import React from 'react';
import GoogleCalculateDistance from '../../utils/GoogleCalculateDistance';

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
            destination } = this.props;
        
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
            <div className={`location-card`}>
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
                                this.setState({distance: distance}) //could set a call back here that once changed, send to parent
                            }
                            
                        }
                    }

                /> 
                <div className={`location-card-image`}>
                    <img src={thumbnail} alt="" />
                </div>
                <div className={`location-card-content`}>
                    <p className={`title`}>{title}</p>
                    <p className={`meta-data saved`}>Saved by: {saves} {(saves > 1 || saves < 1) ? 'photographers' : 'photographer'}</p>
                    {distance && <p className={`meta-data distance`}>Driving distance: {distance}</p>}
                </div>
            </div>
        )

    }

}

LocationCard.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    saves: PropTypes.number,
    destination: PropTypes.object,
    origin: PropTypes.object
}


export default LocationCard;