import PropTypes from 'prop-types';

function NumberInput(props) {

    let { className, ...rest} = props;

    return <input type="number" className={`text-bar ${className ? className : ''}`} {...rest} />

}

NumberInput.propTypes = {
    className: PropTypes.string
}


export default NumberInput;