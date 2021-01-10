import React from 'react';
import ToggleBar from '../buttons/ToggleBar'

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

                <div>
                    {children}
                </div>

                <div className={`map-container ${toggleBarClass}`}>

                    <div className={`toggle-bar`} onClick={handleToggle.bind(this)}>
                        <p>
                            {openedMap ? 'Hide Map' : 'Show Map'}
                        </p>

                    </div>

                    <div className={'map'}>
                        Map will go here
                </div>
                </div>

            </div>

        )

    }

}




export default MapWithCards;