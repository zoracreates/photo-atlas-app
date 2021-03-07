
export const DirectionsLarge = (props) => {
    return (
        <a href={`https://maps.google.com/?q=${props.latitude},${props.longitude}`} className={`action-button directions`}>Directions</a>
    )
}