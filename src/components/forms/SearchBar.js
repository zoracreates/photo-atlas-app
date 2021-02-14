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
        action,
        method,
        searchSuggestions,
        autoComplete,
        handleSuggestion,
        ...rest } = props;


        function sendData(data){
            if (handleSuggestion) {
                handleSuggestion(data)
            } else {
                return undefined
            }
        }


    let searchStyle = backSearch ? 'back-search' : 'standard-search';

    return (
        <>
            {labelText && <label className={`search-label ${searchStyle}-label`} htmlFor={id ? id : 'gsearch'}>{labelText}</label>}
            <div className={`search-bar-container ${searchStyle} ${className ? className : ''}`}>
                <button onClick={() => { window.history.back() }} className={`search-back-buttton`}>Back</button>

                <form action={action} method={method}>

                    <input

                        type="search"

                        className={`text-bar`}

                        name={name ? name : 'q'}

                        id={id ? id : 'gsearch'}

                        placeholder={placeholder ? placeholder : 'Search Term'}

                        autoComplete={autoComplete ? autoComplete : 'off'}

                        {...rest}

                    />


                    <button className={`search-button`} onClick={onClick}>Search</button>
                    {searchSuggestions &&

                        <ul className={`search-suggestions`}>

                            {searchSuggestions[0] && searchSuggestions.map((suggestion, id) => {
                                return (
                                    <li key={id} onClick={() => sendData(
                                         {
                                            'lat': suggestion.x,
                                            'lon': suggestion.y,
                                            'label':suggestion.label

                                         }
                                        )}>{suggestion.label}</li>
                                )

                            }

                            )
                            }

                        </ul>
                    }
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
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    handleSuggestion: PropTypes.func
}


export default SearchBar;