import React from 'react'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'



class PublicTrips extends React.Component {


    render() {
        return (
            <>
                <OneToTwoCols>
                    <TripCard />
                    <TripCard />
                </OneToTwoCols>
            </>
        )
    }

}



export default PublicTrips;