import PropTypes from 'prop-types'

const AddToTripsLarge = ({added, ...rest}) => {

    return (
        <button className={`action-button ${added ? 'added' : 'add'}`} {...rest}>
            {
                added ? 'Change Trips' : 'Add to Trip'
            }
        </button>
    )
}

const AddToTripsSmall = ({added, ...rest}) => {

    return (
        <button className={`action-button-small ${added ? 'added' : 'add'}`} {...rest}>
            {
                added ? 'Change Trips' : 'Add to Trip'
            }
        </button>
    )
}

AddToTripsLarge.propTypes = {
    add: PropTypes.bool
}

AddToTripsSmall.propTypes = {
    add: PropTypes.bool
}

export {AddToTripsLarge, AddToTripsSmall};