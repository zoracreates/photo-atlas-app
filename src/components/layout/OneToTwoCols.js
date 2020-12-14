function OneToTwoCols(props) {

    return (
        <div className={`grid-1_2`}>
            {props.children}
        </div>
    )

}

export default OneToTwoCols;