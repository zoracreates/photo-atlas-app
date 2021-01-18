import PropTypes from 'prop-types';

function CheckBox(props) {

    let {
        className,
        id,
        name,
        labelText,
        ...rest } = props;

    return (
        <>
            <label className={`check-container ${className ? className : ''}` } htmlFor={name}>{labelText ? labelText : 'label'}
                
                <input
                    
                    type="checkbox"

                    className={`${className}`}
                    
                    id={id ? id : name}

                    name={name}

                    {...rest}

                />

                <span className={`checkmark`}></span>

            </label>

        </>
    )
}

CheckBox.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
}


export default CheckBox;