import PropTypes from 'prop-types';

function DateInput(props) {

    let { className, ...rest } = props;

    return <input type="date" className={`text-bar ${className ? className : ''}`} {...rest} />
    
}

DateInput.propTypes = {
    className: PropTypes.string
}


export default DateInput;