import React from 'react'
import PrivateTab from '../../components/navigation/PrivateTab'



class MyTrips extends React.Component {


    tripsContent() {
        return (
            <>
                <h3>My Trips</h3>
            </>
        )
    }

    render() {
        return (
            <>
                <PrivateTab componentContent={this.tripsContent()}  logInLocation={"trips"} />
            </>
        )
    }

}



export default MyTrips;