function PasswordInput(props) {

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
        inputMode } = props;

    return (
        
                <input
                    type="password"

                    className={`text-bar ${className}`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name}

                    placeholder={placeholder}
                    
                    required={required}

                    size={size}

                    autoComplete= {autoComplete}

                    list={list}

                    maxLength={maxLength}

                    minLength={minLength}

                    pattern={pattern}

                    readOnly={readOnly}

                    inputMode={inputMode}

                />
    )
}


export default PasswordInput;