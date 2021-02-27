import { Route } from "react-router-dom";
import PropTypes from 'prop-types';
import Authenticate from '../../screens/authentication/Authenticate'
import VerifyEmail from '../../screens/authentication/VerifyEmail'


function PrivateRoute({ component: Component, isAuthenticated, logInLocation, isVerified, user, ...rest }) {
    
    return (
        <Route

            {...rest}

            render={props => (

                isAuthenticated ?

                    (
                        isVerified ?

                            <Component {...props} />
                            :
                            <VerifyEmail logInLocation={logInLocation} />

                    )

                    :

                    (<Authenticate logInLocation={logInLocation} />)
            )} />

    )
}


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired,
    logInLocation: PropTypes.string
}

export default PrivateRoute;