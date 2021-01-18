import PropTypes from 'prop-types';

function UrlInput(props) {

    let { 
        className, 
        placeholder,  
        pattern, 
        ...rest } = props;
 


    return (
                <input

                    type="url"

                    className={`text-bar ${className}`}
                    
                    placeholder={placeholder ? placeholder : 'https://example.com'}

                    pattern={pattern ? pattern : 'https://.*'}

                    {...rest}

                />
    )
}

TextInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    pattern: PropTypes.string
}



export default UrlInput;