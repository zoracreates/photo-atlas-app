import PropTypes from 'prop-types';

function SubmitButton(props) {
    
    let { className, value, ...rest } = props;

    return (
        <input 
            type="submit" 

            className={`${className ? className : 'default-button'}`} 

            value={value ? value : 'Submit'} 

            {...rest}

        />
    )
}

SubmitButton.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string
}

export default SubmitButton;