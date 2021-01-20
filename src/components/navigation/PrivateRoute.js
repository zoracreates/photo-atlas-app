import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

function PrivateRoute  ({component: Component, isAuthenticated, ...rest})  {
    return (
        <Route 
        
            {...rest} 
        
            render={props => ( 
                
                isAuthenticated ? 
                
                    (<Component {...props}/>) :  ( <Redirect to={{ pathname: '/login', state: {from: props.location} }}/>
                )
        )}/>

    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

export default PrivateRoute;