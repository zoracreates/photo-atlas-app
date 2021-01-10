function SearchBar(props) {

    let { className, onClick, id, showBackButton, placeholder, name, onChange } = props;

    let backSearch = showBackButton ? 'back-search' : 'standard-search';

    return (
        <>

            <button className={`search-back-buttton`}>Back</button>

            <form className={`text-bar ${backSearch} ${className}`}>
                <input

                    type="search"

                    id={id}

                    onChange={onChange}

                    placeholder={placeholder ? placeholder : 'Search Term'}

                    name={name ? name : 'q'}

                />

                <button className={`search-buttton`} onClick={onClick}>Search</button>

            </form>
        </>
    )
}


export default SearchBar;