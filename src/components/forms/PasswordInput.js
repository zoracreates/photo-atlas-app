import PropTypes from 'prop-types';

function PasswordInput(props) {

    let { className, ...rest } = props;

    return <input type="password" className={`text-bar ${className ? className : ''}`} {...rest} />
    
}

PasswordInput.propTypes = {
    className: PropTypes.string
}


export default PasswordInput;