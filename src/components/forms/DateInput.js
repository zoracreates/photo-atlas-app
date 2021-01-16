function DateInput(props) {

    let {
        className,
        id,
        name,
        onChange,
        required,
        autoComplete,
        list,
        readOnly,
        value,
        min,
        max,
        step } = props;



    return (

        <input
            type="date"

            className={`text-bar ${className}`}

            onChange={onChange}

            id={id}

            name={name}

            value={value}

            required={required}

            autoComplete={autoComplete}

            list={list}

            max={max}

            min={min}

            readOnly={readOnly}

            step={step}

        />
    )
}


export default DateInput;