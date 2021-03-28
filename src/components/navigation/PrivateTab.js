import React from 'react'
import PropTypes from 'prop-types'
import Authenticate from '../../screens/authentication/Authenticate'
import VerifyEmail from '../../screens/authentication/VerifyEmail'




function PrivateTab (props) {
        if (props.isAuthenticated) {
            if (!props.isVerified) {
                return <VerifyEmail logInLocation={props.logInLocation} tabContent={true}/>
            } else {
               return props.componentContent();

            }
        }
        else {
            return (
                <Authenticate logInLocation={props.logInLocation} tabContent={true}/>
            )
        }
}

PrivateTab.propTypes = {
    logInLocation: PropTypes.string,
    componentContent: PropTypes.func.isRequired
}



export default PrivateTab;