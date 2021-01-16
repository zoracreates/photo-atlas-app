function SubmitButton(props) {
    
    let { className, value, onClick, id } = props;

    return (
        <input 
            type="submit" 

            id={id}

            className={`${className ? className : 'default-button'}`} 

            value={value ? value : 'Submit'} 

            onClick={onClick}

        />
    )
}

export default SubmitButton;