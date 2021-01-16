function CheckBox(props) {

    let { 
        className, 
        id, 
        name, 
        onChange, 
        required, 
        value,
        checked,
        indeterminate,
        checkboxText} = props;
 
        let inputName = name ? name : "checkbox";

    return (
        <>
            <label className={`check-container`} htmlFor={inputName}>{checkboxText ? checkboxText : 'label'}
                <input
                    type="checkbox"

                    className={`${className}`}
                    
                    onChange={onChange}
                
                    id={id ? id : inputName}

                    name={inputName}


                    required={required}

                    checked={checked}
                    
                    value={inputName}
                    
                    indeterminate={indeterminate}
                />

                <span className={`checkmark`}></span>

            </label>
    </>
    )
}


export default CheckBox;