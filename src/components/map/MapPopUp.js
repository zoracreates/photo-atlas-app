import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom'

function MapPopup(props) {

    let {
        thumbnail,
        title,
        src,
        locationId } = props;

    if (!title) {
        title = "Unamed Location"
    }

    let titleLength = title.length;

    //keep the lenght of the title at 45 characters
    if (titleLength > 150) {
        let extraChars = 150 - titleLength;
        let slicedTitle = title.slice(0, extraChars);
        let lastSpace = slicedTitle.lastIndexOf(" ");
        slicedTitle = slicedTitle.slice(0, lastSpace);
        title = `${slicedTitle}...`
    }

    return (
        <Popup>
            <div className={"map-popup"}>

                <div className={"location-popup-image"}>
                    <img src={thumbnail} alt="" />
                </div>
                <Link to={ `/location/${src}-${locationId}`} className={`title`}>{title}</Link>

            </div>
        </Popup>
    )
}

MapPopup.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    src: PropTypes.string,
    locationId: PropTypes.string
}


export default MapPopup;