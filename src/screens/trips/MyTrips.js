import React from 'react'
import PrivateTab from '../../components/navigation/PrivateTab'



class MyTrips extends React.Component {


    tripsContent() {
        return (
            <>
                <h3>TEST</h3>
            </>
        )
    }

    render() {
        return (
            <>
                <PrivateTab 
                    componentContent={()=>this.tripsContent()}  
                    logInLocation={"trips"} 
                    isVerified={this.props.isVerified}
                    isAuthenticated={this.props.isAuthenticated}
                    />
                

            </>
        )
    }

}



export default MyTrips;