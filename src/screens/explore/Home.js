import SearchBar from '../../components/forms/SearchBar';

function Home() {
    return (
        <div className={`home`}>
            <div className={`dark-background`}>
                <div className={`container mobile-padding`}>
                    <p className={`home-heading`}>Photo Atlas</p>
                    <h2 className={`h5-font`}>Find new places to capture your best work.</h2>
                    <SearchBar labelText="Where do you want to go?" placeholder="Search a place" />
                </div>
            </div>
        </div>
    )

}

export default Home;