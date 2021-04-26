
import PropTypes from 'prop-types'

const DirectionsSmall = (props) => {
    return (
        <a href={`https://maps.google.com/?q=${props.latitude},${props.longitude}`} className={`action-button-small directions`}>Directions</a>
    )
}

const DirectionsLarge = (props) => {
    return (
        <a href={`https://maps.google.com/?q=${props.latitude},${props.longitude}`} className={`action-button directions`}>Directions</a>
    )
}

DirectionsLarge.propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number
}

export {DirectionsLarge, DirectionsSmall};