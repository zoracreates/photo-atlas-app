function UrlInput(props) {

    let { 
        className, 
        id, 
        name, 
        onChange, 
        placeholder, 
        required, 
        size, 
        autoComplete, 
        list, 
        maxLength, 
        minLength,  
        pattern, 
        readOnly } = props;
 


    return (
        
                <input
                    type="url"

                    className={`text-bar ${className}`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name}

                    placeholder={placeholder ? placeholder : 'https://example.com'}
                    
                    required={required}

                    size={size}

                    autoComplete= {autoComplete}

                    list={list}

                    maxLength={maxLength}

                    minLength={minLength}

                    pattern={pattern ? pattern : 'https://.*'}

                    readOnly={readOnly}

                />
    )
}


export default UrlInput;