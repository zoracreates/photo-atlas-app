import PropTypes from 'prop-types';

function EmailInput(props) {

    let { className, ...rest} = props;

    return <input type="email" className={`text-bar ${className ? className : ''}`} {...rest} />
}

EmailInput.propTypes = {
    className: PropTypes.string
}

export default EmailInput;