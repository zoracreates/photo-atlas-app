function TextArea(props) {

    let { 
        className, 
        id, 
        name, 
        onChange,
        cols,
        rows,
        disabled,
        form,
        maxLength, 
        minLength, 
        placeholder, 
        required, 
        autoComplete, 
        readOnly } = props;
 

    return (
        
                <textarea

                    className={`text-bar ${className}`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name}

                    placeholder={placeholder ? placeholder : 'Enter Text'}
                    
                    required={required}

                    autoComplete= {autoComplete}

                    maxLength={maxLength}

                    minLength={minLength}

                    readOnly={readOnly}

                    form={form}

                    cols={cols}

                    rows={rows}

                    disabled={disabled}
                    
                    >

                </textarea>
    )
}


export default TextArea;