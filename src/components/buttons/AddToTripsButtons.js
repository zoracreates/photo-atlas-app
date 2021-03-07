export const AddToTripsLarge = (props) => {

    return (
        <button className={`action-button ${props.added ? 'added' : 'add'}`}>
            {
                props.added ? 'Change Trips' : 'Add to Trip'
            }
        </button>
    )
}

export const AddToTripsSmall = (props) => {

    return (
        <button className={`action-button-small ${props.added ? 'added' : 'add'}`}>
            {
                props.added ? 'Change Trips' : 'Add to Trip'
            }
        </button>
    )
}