import PropTypes from 'prop-types';

function SearchBar(props) {

    let { 
        className, 
        name, 
        onClick, 
        placeholder,
        backSearch,
        ...rest } = props;
 

        let searchStyle = backSearch ? 'back-search' : 'standard-search';

    return (
        <div className={`search-bar-container ${searchStyle} ${className ? className : ''}`}>

            <button onClick={() => {window.history.back()}} className={`search-back-buttton`}><span></span>Back</button>

            <form>
                <input

                    type="search"

                    className={`text-bar`}
            
                    name={name ? name : 'q'}

                    placeholder={placeholder ? placeholder : 'Search Term'}

                    {...rest}

                />

                <button className={`search-button`} onClick={onClick}>Search</button>

            </form>
        </div>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string,
    backSearch: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string
}


export default SearchBar;