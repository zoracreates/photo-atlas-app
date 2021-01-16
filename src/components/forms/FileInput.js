function FileInput(props) {

    let {
        className,
        id,
        name,
        onChange,
        required,
        accept,
        capture,
        files,
        value,
        multiple,
        buttonText } = props;

    let inputName = name ? name : "file"


    return (
        <>
            <input
                type="file"

                className={`file-input ${className}`}

                onChange={onChange}

                id={id ? id : inputName}

                name={inputName}

                required={required}

                accept={accept}

                capture={capture}

                files={files}

                value={value}

                multiple={multiple}

            />
              <label for={inputName}>{buttonText ? buttonText : 'Choose a file'}</label>
        </>
    )
}


export default FileInput;