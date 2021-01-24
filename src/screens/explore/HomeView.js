import SearchBar from '../../components/forms/SearchBar'

function HomeView() {
    return (
        <div className={`home`}>
            <div className={`dark-background`}>
                <div className={`container mobile-padding`}>
                    <p className={`h3-font`}>Photo Atlas</p>
                    <h2 className={`h5-font`}>Find new places to capture your best work.</h2>
                    <p className={`caption-font`}>Where do you want to go?</p>
                    <SearchBar placeholder="Search a place" />
                </div>
            </div>
        </div>
    )

}

export default HomeView;