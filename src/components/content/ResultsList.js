
import PropTypes from 'prop-types';

import LocationCard from '../cards/LocationCard';

function ResultsList(props) {

    let { loaded, list, needLocation } = props;

    let count = list.length;

    if (!loaded) {
        return <p>Getting Locations...</p>
    }

    if (loaded && count > 0) {
        return (
            <>
            <p aria-live="polite" className="sr-only">Showing search results</p>
            {list.map((location, id) => {
                const { thumbnail, title, saves, origin, destination, src, locationId } = location;

                return (

                    //make these into links where the search param should be the photo id
                    <LocationCard
                        key={id}
                        thumbnail={thumbnail}
                        title={title}
                        origin={origin}
                        destination={destination}
                        saves={saves}
                        src={src}
                        locationId={locationId}
                        />
                )

            })}
            </>
        )

    }

    if (loaded && needLocation && count === 0) {
        return (
            <p aria-live="polite">
                Share your location to explore what's nearby.
            </p>
        )
    }

    if (loaded && count === 0 && !needLocation) {
        return (
            <p aria-live="polite">
                Sorry, no photo spots here yet. Let's checkout a different location!
            </p>
        )
    }

}

ResultsList.propTypes = {
    loaded: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ResultsList;