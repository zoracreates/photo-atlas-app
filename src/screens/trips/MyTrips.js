import React from 'react'
import PrivateTab from '../../components/navigation/PrivateTab'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'



class MyTrips extends React.Component {

    state = {
        existingTrips: []
    }


    renderUserTrips() {

        let { existingTrips } = this.state;

        // getPublicTrips((tripsList) => {
        //     this._isMounted && this.setState({ existingTrips: tripsList })
        // })

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



export default MyTrips;