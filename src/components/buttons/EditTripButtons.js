
const EditTripLarge = ({added, ...rest}) => {

    return (
        <button className={`action-button edit`} {...rest}>
            Edit Trip
        </button>
    )
}

const EditTripSmall = ({added, ...rest}) => {

    return (
        <button className={`action-button-small edit`} {...rest}>
            Edit Trip
        </button>
    )
}


export {EditTripLarge,  EditTripSmall};