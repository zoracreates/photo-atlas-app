function NumberInput(props) {

    let { 
        className, 
        id, 
        name, 
        onChange, 
        placeholder, 
        required, 
        autoComplete, 
        list, 
        max, 
        min,  
        readOnly,
        step } = props;
 


    return (
        
                <input
                    type="number"

                    className={`text-bar ${className}`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name}

                    placeholder={placeholder ? placeholder : '0'}
                    
                    required={required}

                    autoComplete= {autoComplete}

                    list={list}

                    max={max}

                    min={min}


                    readOnly={readOnly}

                    step={step}

                />
    )
}


export default NumberInput;