import React from 'react'
import PropTypes from 'prop-types'
import PrivateTab from '../../components/navigation/PrivateTab'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'
import getUserTrips from '../../utils/getUserTrips'



class MyTrips extends React.Component {

    state = {
        existingTrips: []
    }
    _isMounted = false;

    componentDidMount() {
       this._isMounted = true;
       let userId = this.props.userId;
       this._isMounted && getUserTrips(userId, (tripsList) => this.setState({existingTrips: tripsList}))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    renderUserTrips() {

        let { existingTrips } = this.state;

        return (
        <OneToTwoCols>
            {existingTrips.map((trip, index) => {
                let {
                    thumbnail,
                    title,
                    locationsCount,
                    isPublic,
                    isShared,
                    tripId } = trip;

                return (
                    <TripCard
                        key={index}
                        thumbnail={thumbnail}
                        title={title}
                        tripId={tripId}
                        isPublic={isPublic}
                        isShared={isShared}
                        locationsCount={locationsCount}
                    />
                )
            })}
        </OneToTwoCols>)
    }

    render() {
        return (
            <>
                <PrivateTab 
                    componentContent={()=>this.renderUserTrips()}  
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