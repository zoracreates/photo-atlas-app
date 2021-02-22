import {Route} from "react-router-dom";
import PropTypes from 'prop-types';
import Authenticate from '../../screens/authentication/Authenticate'


function PrivateRoute  ({component: Component, isAuthenticated, logInLocation, ...rest})  {
    return (
        <Route 
        
            {...rest} 
        
            render={props => ( 
                
                isAuthenticated ? 
                
                    (<Component {...props}/>) 
                    
                    :  
                    
                    ( <Authenticate logInLocation={logInLocation} />)
        )}/>

    )
}


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logInLocation: PropTypes.string
}

export default PrivateRoute;