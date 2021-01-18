import PropTypes from 'prop-types';

function RadioButton(props) {

    let { 
        id,
        value,
        labelText,
        className,
        name,
        ...rest } = props;
 
    let idName = id ? id : value;

    return (
        
        <>
        
            <label className={`check-container ${className ? className : ''}`} htmlFor={idName}>{labelText ? labelText : 'label'}

                <input
                    
                    type="radio"

                    id={idName}

                    name={name}

                    value={value}

                    {...rest}

                />

                <span className={`radiomark`}></span>

            </label>
    </>
    )
}

RadioButton.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}


export default RadioButton;