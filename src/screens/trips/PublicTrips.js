import React from 'react'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'
import getPublicTrips from '../../utils/getPublicTrips'




class PublicTrips extends React.Component {
    state={
        existingTrips: []
    }

    renderPublicTrips() {
        let { existingTrips } = this.state;

        getPublicTrips((tripsList) => this.setState({existingTrips: tripsList}))
        return (<>
            {existingTrips.map((trip, index) => {
                let {
                    thumbnail,
                    title,
                    locationsCount,
                    isPublic,
                    tripId } = trip;

                return (
                    <TripCard 
                        key={index}
                        thumbnail={thumbnail}
                        title={title}
                        tripId={tripId}
                        isPublic={isPublic}
                        locationsCount={locationsCount}
                    />
                )
            })}
        </>)

    }
    render() {
        return (
            <>
                <OneToTwoCols>
                    {this.renderPublicTrips()}
                </OneToTwoCols>
            </>
        )
    }

}



export default PublicTrips;