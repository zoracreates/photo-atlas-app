function ScrollToThreeCols(props) {

    return (
        <div className={`grid-scroll`}>
            {props.children}
        </div>
    )

}

export default ScrollToThreeCols;