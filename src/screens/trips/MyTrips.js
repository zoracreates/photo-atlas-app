import React from 'react'
import PropTypes from 'prop-types'
import PrivateTab from '../../components/navigation/PrivateTab'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'
import getUserTrips from '../../utils/getUserTrips'



class MyTrips extends React.Component {

    state = {
        existingTrips: [],
        loading: true
    }
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        let userId = this.props.userId;
        this._isMounted && this.props.isAuthenticated && getUserTrips(userId, (tripsList) => 
            {
                if(tripsList) {
                    this.setState({ existingTrips: tripsList, loading: false })
                } else {
                    this.setState({ loading: false })
                }
                
            }
            )
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderUserTrips() {

        let { existingTrips, loading } = this.state;

        if (loading) {
            return (
                <div aria-live="polite">
                    <p>Getting Trips...</p>
                </div>
            )
        } else {
            if(existingTrips.length > 0) {
                return (
                    <>
                        <div aria-live="polite" className="sr-only">
                            <p>Showing all trips</p>
                        </div>
                        <OneToTwoCols>
                            {existingTrips.map((trip, index) => {
                                let {
                                    thumbnail,
                                    title,
                                    locationsCount,
                                    privacy,
                                    tripId } = trip;
    
                                return (
                                    <TripCard
                                        key={index}
                                        thumbnail={thumbnail}
                                        title={title}
                                        tripId={tripId}
                                        privacy={privacy}
                                        locationsCount={locationsCount}
                                    />
                                )
                            })}
                        </OneToTwoCols>
                    </>)
                
            } else {
                return (
                    <div aria-live="polite">
                        <p>No trips here yet.</p>
                    </div>
                )
            }
  

        }


    }

    render() {
        return (
            <>
                <PrivateTab
                    componentContent={() => this.renderUserTrips()}
                    logInLocation={"trips"}
                    isVerified={this.props.isVerified}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </>
        )
    }

}

MyTrips.propTypes = {
    userId: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isVerified: PropTypes.bool
}



export default MyTrips;