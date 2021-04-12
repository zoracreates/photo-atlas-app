import PropTypes from 'prop-types'

const BookmarkTripLarge = ({bookmarked, updating, ...rest}) => {

    return (
        <button className={`action-button ${bookmarked ? 'bookmarked' : 'bookmark'}`} {...rest}>
            {
               updating ? 'Updating'  : (bookmarked ? 'Unbookmark' : 'Bookmark')
            }
        </button>
    )
}

const BookmarkTripSmall = ({bookmarked, updating, ...rest}) => {

    return (
        <button className={`action-button-small ${bookmarked ? 'bookmarked' : 'bookmark'}`} {...rest}>
            {
                updating ? 'Updating'  : (bookmarked ? 'Unbookmark' : 'Bookmark')
            }
        </button>
    )
}

BookmarkTripLarge.propTypes = {
    bookmarked: PropTypes.bool
}

BookmarkTripSmall.propTypes = {
    bookmarked: PropTypes.bool,
    updating:  PropTypes.bool
}

export {BookmarkTripLarge , BookmarkTripSmall};