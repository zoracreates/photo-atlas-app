import React from 'react';

import Map from '../content/Map';

class MapWithCards extends React.Component {

    state = {
        openedMap: true
    }

    handleToggle = () => {
        this.setState({ openedMap: !this.state.openedMap });
    }

    render(props) {
        let { children, mapLoctaions, mapLat, mapLon, mapZoom } = this.props;

        let { openedMap } = this.state;

        let handleToggle = this.handleToggle;

        let toggleBarClass = openedMap ? 'open' : 'close';

        return (
            <div className={`grid-map`}>

                <div className={`cards-container`}>
                    {children}
                </div>

                <div className={`map-container ${toggleBarClass}`}>

                    <div className={`toggle-bar`} onClick={handleToggle.bind(this)}>
                        <p>
                            {openedMap ? 'Hide Map' : 'Show Map'}
                        </p>

                    </div>

                    <div className={'map'}>
                        <Map locations={mapLoctaions} lat={mapLat} lon={mapLon} zoom={mapZoom}/>
                    </div>
                </div>

            </div>

        )

    }

}




export default MapWithCards;