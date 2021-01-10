function SearchBar(props) {

    let { className, onClick, id, showBackButton, placeholder, name, onChange } = props;

    let searchStyle = showBackButton ? 'back-search' : 'standard-search';

    return (
        <div className={`search-bar-container ${searchStyle} ${className}`}>

            <button onClick={() => {window.history.back()}} className={`search-back-buttton`}><span></span>Back</button>

            <form>
                <input
                    
                    className={`text-bar`}
                    
                    type="search"

                    id={id}

                    onChange={onChange}

                    placeholder={placeholder ? placeholder : 'Search Term'}

                    name={name ? name : 'q'}

                />

                <button className={`search-button`} onClick={onClick}>Search</button>

            </form>
        </div>
    )
}


export default SearchBar;