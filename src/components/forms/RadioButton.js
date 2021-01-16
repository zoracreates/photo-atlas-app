function RadioButton(props) {

    let { 
        className, 
        name, 
        id,
        onChange, 
        required,
        value,
        defaultChecked,
        indeterminate,
        checkboxText} = props;
 
        let idName = id ? id : value;

    return (
        
        <>
        
            <label className={`check-container`} htmlFor={idName}>{checkboxText ? checkboxText : 'label'}

                <input
                    type="radio"

                    className={`${className}`}
                    
                    onChange={onChange}
                
                    id={idName}

                    name={name}

                    required={required}

                    defaultChecked={defaultChecked}
                    
                    value={value}
                    
                    indeterminate={indeterminate}
                />

                <span className={`radiomark`}></span>

            </label>
    </>
    )
}


export default RadioButton;