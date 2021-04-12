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

    getTripsList() {
        let userId = this.props.userId;
        if (this.props.isAuthenticated) {
            getUserTrips(userId, (tripsList) => {
                if (tripsList.length > 0) {
                    this._isMounted &&  this.setState({ existingTrips: tripsList, loading: false })
                } else {
                    this._isMounted && this.setState({ loading: false })
                }
            }
            )
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getTripsList()
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            this.getTripsList()
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderUserTrips() {

        let { existingTrips, loading } = this.state;

        while (loading) {
            return (
                <div aria-live="polite">
                    <p>Getting Trips...</p>
                </div>
            )
        } 
        
            if (existingTrips.length > 0) {
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
                                    tripId,
                                    authorId } = trip;

                                return (
                                    <TripCard
                                        key={index}
                                        thumbnail={thumbnail}
                                        title={title}
                                        tripId={tripId}
                                        privacy={privacy}
                                        locationsCount={locationsCount}
                                        authorId={authorId}
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