import { useHistory } from 'react-router-dom';

function LogIn(props) {


    let logInLocation = useHistory().location.state.from.pathname;

    let trips = '/trips'
    let add = '/add'
    let profile = '/profile'


    let text;

    switch (logInLocation){
        case trips:
            text = "view your trips"
            break;
        case add:
            text = "add a location"
            break;
        case profile:
            text = "view your profile information"
            break;
        default:
            text = "continue your PhotoAtlas journey"
    }
    
    return  (
        <>
        <h2>LogIn</h2>
        <p>Create an account or log in to {text}.</p>
        </>
    )

}

export default LogIn;