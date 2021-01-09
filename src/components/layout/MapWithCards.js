import React from 'react';

class MapWithCards extends React.Component {

    state = {
        toggle: 'open'
    }

handleToggle = () => {

    let setToOpen = () => this.setState({toggle: 'open'});
    let setToClose = () => this.setState({toggle: 'close'});
     
    (this.state.toggle === 'open') ? setToClose() : setToOpen();
}

render() {
    let { children } = this.props;

    let handleToggle = this.handleToggle;

    let { toggle } = this.state;

    return (
        <div className={`grid-map`}>

            <div>
                {children}
            </div>

            <div className={`map-container ${toggle}`}>
                <div className={`map-toggle-bar`} onClick={handleToggle.bind(this)}>
                    <p>
                        {toggle == 'open' ? 'Hide Map' : 'Show Map'}
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