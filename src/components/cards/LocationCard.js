import PropTypes from 'prop-types';

function LocationCard(props) {
    let {
        imageUrl,
        title,
        saves,
        distance} = props;

        if (!saves) {
            saves = 0;
        }

        let titleLength = title.length;

        //keep the lenght of the title at 45 characters
        if (titleLength > 45) {
            let extraChars =  45 - titleLength ;
            let slicedTitle = title.slice(0, extraChars);
            let lastSpace = slicedTitle.lastIndexOf(" ");
            slicedTitle = slicedTitle.slice(0,lastSpace);
            title = `${slicedTitle}...`
        }

    return (
        <div className={`location-card`}>
            <div className={`location-card-image`}>
                <img src={imageUrl} alt="" />
            </div>
            <div className={`location-card-content`}>
                <p className={`title`}>{title}</p>
                <p className={`meta-data saved`}>Saved by: {saves} {(saves > 1 || saves < 1) ? 'photographers' : 'photographer'}</p>
                {distance && <p className={`meta-data distance`}>Distance: {distance}mi</p>}
            </div>
        </div>
    )
}

LocationCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    saves: PropTypes.number,
    distance: PropTypes.number
}
  

export default LocationCard;