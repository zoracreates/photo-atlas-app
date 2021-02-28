import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function TitleCard(props) {
    let {
        thumbnail,
        title,
        src,
        locationId } = props;

    if (!title) {
        title = "Unamed Location"
    }

    let titleLength = title.length;

    //keep the lenght of the title at 45 characters
    if (titleLength > 150) {
        let extraChars = 150 - titleLength;
        let slicedTitle = title.slice(0, extraChars);
        let lastSpace = slicedTitle.lastIndexOf(" ");
        slicedTitle = slicedTitle.slice(0, lastSpace);
        title = `${slicedTitle}...`
    }

    return (
        <Link className={`title-card`} to={ `/location/${src}-${locationId}`}>
            <div className={`title-card-image`}>
                <img src={thumbnail} alt="" />
            </div>

            <p className={`title`}>{title}</p>
        </Link>
    )
}

TitleCard.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    src: PropTypes.string,
    locationId: PropTypes.string
}


export default TitleCard;