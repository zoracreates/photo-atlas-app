import React from 'react'
import PropTypes from 'prop-types';
import PublicTrips from './PublicTrips'
import MyTrips from './MyTrips'




class Trips extends React.Component {

    state = {
        isPublic: true
    }

    renderContent() {

        if (this.state.isPublic) {
            return <PublicTrips />
        }
        else {
            return (
                <MyTrips 
                    isVerified={this.props.isVerified} 
                    isAuthenticated={this.props.isAuthenticated}
                    userId={this.props.userId}
                    />
            )
        }

    }

    switchTabs(value) {
        this.setState({isPublic: value})
    }

    render() {
        return (
            <>
                <div className={`container trips mobile-padding`}>
                    <h2>Trips</h2>
                    <ul className={`tabs`}>
                        <li>
                            <button 
                                className={this.state.isPublic ? 'active' : 'inactive'} 
                                onClick={() => this.switchTabs(true)}>All Public Trips
                            </button>
                        </li>
                        <li>
                            <button
                            className={this.state.isPublic ? 'inactive' : 'active' } 
                            onClick={() => this.switchTabs(false)}>
                                My Trips
                            </button>
                            </li>
                    </ul>
                    {this.renderContent()}
                </div>
            </>
        )
    }

}

Trips.propTypes = {
    userId: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isVerified: PropTypes.bool
}



export default Trips;