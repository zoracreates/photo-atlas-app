import React from 'react'
import MapWithCards from '../../components/layout/MapWithCards'
import ResultsList from '../../components/content/ResultsList'

class TripContent extends React.Component {
    state = {
        loaded: false,
        tripList: [],
        mapLat: null,
        mapLon: null, //set map to last saved location
        mapZoom: 10
    }

    render() {
        let  {
            loaded,
            tripList,
            mapLat,
            mapLon,
            mapZoom } = this.state;
        
        return (
            <>
                <div className={`container`}>

                    <MapWithCards
                        mapLoctaions={tripList}
                        mapLat={mapLat}
                        mapLon={mapLon}
                        mapZoom={mapZoom}
                    >

                    <ResultsList loaded={loaded} list={tripList} />

                    </MapWithCards>
                </div>
            </>
        )
    }
}

export default TripContent;