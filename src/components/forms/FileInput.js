import PropTypes from 'prop-types';

function FileInput(props) {

    let {
        className,
        id,
        name,
        buttonText,
        ...rest } = props;

    let inputName = name ? name : "file"


    return (
        <>
            <input
                type="file"

                className={`file-input ${className ? className : ''}`}

                id={id ? id : inputName}

                name={inputName}

                {...rest}

            />
              <label for={inputName}>{buttonText ? buttonText : 'Choose a file'}</label>
        </>
    )
}


FileInput.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    buttonText: PropTypes.string
}

export default FileInput;