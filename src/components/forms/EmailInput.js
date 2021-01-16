function EmailInput(props) {

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
        readOnly,
        multiple } = props;
 


    return (
        
                <input
                    type="email"

                    className={`text-bar ${className}`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name}

                    placeholder={placeholder ? placeholder : 'username@email.com'}
                    
                    required={required}

                    size={size}

                    autoComplete= {autoComplete}

                    list={list}

                    maxLength={maxLength}

                    minLength={minLength}

                    pattern={pattern}

                    readOnly={readOnly}

                    multiple={multiple}

                />
    )
}


export default EmailInput;