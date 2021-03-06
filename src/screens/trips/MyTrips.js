import React from 'react'
import Authenticate from '../authentication/Authenticate'
import VerifyEmail from '../authentication/VerifyEmail'



class MyTrips extends React.Component {


    tripsContent() {
        return (
            <>
                <h3>My Trips</h3>
            </>
        )
    }

    renderContent() {

        if (this.props.isAuthenticated) {
            if (!this.props.isVerified) {
                return <VerifyEmail logInLocation={"trips"} tabContent={true}/>
            } else {
                return this.tripsContent()
            }
        }
        else {
            return (
                <Authenticate logInLocation={"trips"} tabContent={true}/>
            )
        }
    }


    render() {
        return (
            <>
                {this.renderContent()}
            </>
        )
    }

}



export default MyTrips;