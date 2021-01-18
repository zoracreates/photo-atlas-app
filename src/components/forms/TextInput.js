import PropTypes from 'prop-types';

function TextInput(props) {

    let { className, ...rest } = props;

    return <input type="text" className={`text-bar ${className ? className : ''}`} {...rest} />
    
}

TextInput.propTypes = {
    className: PropTypes.string
}

export default TextInput;