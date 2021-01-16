function SearchBar(props) {

    let { 
        className, 
        id, 
        name, 
        onClick, 
        onChange, 
        placeholder, 
        required, 
        size, 
        autoComplete, 
        list, 
        maxLength, 
        minLength,  
        pattern, 
        readOnly, 
        showBackButton } = props;
 
    let searchStyle = showBackButton ? 'back-search' : 'standard-search';

    return (
        <div className={`search-bar-container ${searchStyle} ${className}`}>

            <button onClick={() => {window.history.back()}} className={`search-back-buttton`}><span></span>Back</button>

            <form>
                <input
                    type="search"

                    className={`text-bar`}
                    
                    onChange={onChange}
                
                    id={id}

                    name={name ? name : 'q'}

                    placeholder={placeholder ? placeholder : 'Search Term'}
                    
                    required={required}

                    size={size}

                    autoComplete= {autoComplete}

                    list={list}

                    maxLength={maxLength}

                    minLength={minLength}

                    pattern={pattern}

                    readOnly={readOnly}

                />

                <button className={`search-button`} onClick={onClick}>Search</button>

            </form>
        </div>
    )
}


export default SearchBar;