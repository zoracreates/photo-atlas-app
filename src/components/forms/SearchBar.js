import PropTypes from 'prop-types';

function SearchBar(props) {

    let { 
        className, 
        name, 
        onClick, 
        placeholder,
        backSearch,
        id,
        labelText,
        ...rest } = props;
 

        let searchStyle = backSearch ? 'back-search' : 'standard-search';

    return (
        <>
        {labelText && <label className={`search-label ${searchStyle}-label`} htmlFor={id ? id : 'gsearch'}>{labelText}</label>}
        <div className={`search-bar-container ${searchStyle} ${className ? className : ''}`}>
            <button onClick={() => {window.history.back()}} className={`search-back-buttton`}>Back</button>
            
            <form>
                
                <input

                    type="search"

                    className={`text-bar`}
            
                    name={name ? name : 'q'}

                    id ={id ? id : 'gsearch'}

                    placeholder={placeholder ? placeholder : 'Search Term'}

                    {...rest}

                />

                <button className={`search-button`} onClick={onClick}>Search</button>
            </form>
        </div>
        </>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string,
    labelText: PropTypes.string,
    backSearch: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string
}


export default SearchBar;