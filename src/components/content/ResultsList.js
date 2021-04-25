
import PropTypes from 'prop-types';


import TitleCard from '../cards/TtitleCard'
import TitleCardCols from '../../components/layout/TitleCardCols';

function ResultsList(props) {

    let { loaded, list, needLocation } = props;

    let count = list.length;

    if (!loaded) {
        return <p>Getting Locations...</p>
    }

    if (loaded && count > 0) {
        return (
            <>
            <div aria-live="polite" className="sr-only">
                <p>Showing search results</p>
            </div>
            <TitleCardCols>
            {list.map((location, id) => {
                const { thumbnail, title, src, locationId, woeId } = location;

                return (
                    
                    <TitleCard
                        key={id}
                        thumbnail={thumbnail}
                        title={title}
                        src={src}
                        locationId={locationId}
                        woeId={woeId}
                        />
                    
                )

            })}
            </TitleCardCols>
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
                Sorry, no photo spots here yet.
            </p>
        )
    }

}

ResultsList.propTypes = {
    loaded: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    needLocation: PropTypes.bool
}

export default ResultsList;