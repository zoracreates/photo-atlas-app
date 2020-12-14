function MapWithCards(props) {
    return (
        <div className={`grid-map`}>

            <div>
                {props.children}
            </div>

            <div className={`map`}>
                Map will go here
            </div>
        
      </div>

    )
}

export default MapWithCards;