import PropTypes from 'prop-types'

const BookmarkTripLarge = ({bookmarked, ...rest}) => {

    return (
        <button className={`action-button ${bookmarked ? 'bookmarked' : 'bookmark'}`} {...rest}>
            {
                bookmarked ? 'Unbookmark' : 'Bookmark'
            }
        </button>
    )
}

const BookmarkTripSmall = ({bookmarked, ...rest}) => {

    return (
        <button className={`action-button-small ${bookmarked ? 'bookmarked' : 'bookmark'}`} {...rest}>
            {
                bookmarked ? 'Unbookmark' : 'Bookmark'
            }
        </button>
    )
}

BookmarkTripLarge.propTypes = {
    bookmarked: PropTypes.bool
}

BookmarkTripSmall.propTypes = {
    bookmarked: PropTypes.bool
}

export {BookmarkTripLarge , BookmarkTripSmall};