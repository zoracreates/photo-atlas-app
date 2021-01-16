function TextInput(props) {

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
                    type="text"

                    className={`text-bar ${className}`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name}

                    placeholder={placeholder ? placeholder : 'Enter Text'}
                    
                    required={required}

                    size={size}

                    autoComplete= {autoComplete}

                    list={list}

                    maxLength={maxLength}

                    minLength={minLength}

                    pattern={pattern}

                    readOnly={readOnly}

                />
    )
}


export default TextInput;