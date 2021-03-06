import React from 'react'
import PublicTrips from './PublicTrips'
import MyTrips from './MyTrips'



class Trips extends React.Component {

    state = {
        public: true
    }

    renderContent() {

        if (this.state.public) {
            return <PublicTrips />
        }
        else {
            return (
                <MyTrips isVerified={this.props.isVerified} isAuthenticated={this.props.isAuthenticated}/>
            )
        }

    }

    switchTabs(value) {
        this.setState({public: value})
    }

    render() {
        return (
            <>
                <div className={`container mobile-padding`}>
                    <h2>Trips</h2>
                    <ul>
                        <li><button onClick={() => this.switchTabs(true)}>All Public Trips</button></li>
                        <li><button onClick={() => this.switchTabs(false)}>My Trips</button></li>
                    </ul>
                    {this.renderContent()}
                </div>
            </>
        )
    }

}



export default Trips;