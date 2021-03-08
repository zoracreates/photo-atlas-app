
import PropTypes from 'prop-types'

const DirectionsLarge = (props) => {
    return (
        <a href={`https://maps.google.com/?q=${props.latitude},${props.longitude}`} className={`action-button directions`}>Directions</a>
    )
}

DirectionsLarge.propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number
}

export {DirectionsLarge};