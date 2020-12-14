function OneToThreeCols(props) {

    return (
        <div className={`grid-1_3`}>
            {props.children}
        </div>
    )

}

export default OneToThreeCols;