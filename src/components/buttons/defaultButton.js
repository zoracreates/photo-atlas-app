function DefaultButton(props) {
    let { onClick, text } = props;
    
    return(
        <button onClick={onClick} className={`default-button`}>
                {text ? text : 'Button Text'}
        </button>
    )
}

export default DefaultButton;