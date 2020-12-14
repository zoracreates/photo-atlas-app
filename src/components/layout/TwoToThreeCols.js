function TwoToThreeCols(props) {

    return (
        <div className={`grid-2_3`}>
            {props.children}
        </div>
    )

}

export default TwoToThreeCols;