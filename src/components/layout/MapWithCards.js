import React from 'react';

class MapWithCards extends React.Component {

    state = {
        openedMap: true
    }

    handleToggle = () => {
        this.setState({ openedMap: !this.state.openedMap });
    }

    render() {
        let { children } = this.props;

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
                        <iframe
                            title="Search Results Map"
                            frameBorder="0" 
                            src={`https:/www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_API_KEY}&q=Space+Needle,Seattle+WA`} >
                        </iframe>
                    </div>
                </div>

            </div>

        )

    }

}




export default MapWithCards;