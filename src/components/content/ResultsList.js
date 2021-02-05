
import PropTypes from 'prop-types';

import LocationCard from '../cards/LocationCard';

function ResultsList (props)  {

   let {loaded, list} = props;

   let count = list.length;

    if (!loaded) {
        return <p className={`results-status`}>Getting Locations...</p>
    } 
    
    if (loaded && count > 0) {
        return (
            list.map((location, id) => {
                const { thumbnail, title, distance, saves } = location;

                return (
                    
                    //make these into links where the search param should be the photo id
                    <LocationCard key={id} thumbnail={thumbnail} title={title} distance={distance} saves={saves} />
                )

            })
        )

    } 
    
    if (loaded && count === 0) {
        return (
            <p className={`results-status`}>
                Sorry, no photo spots here yet. Let's checkout a different location!
            </p>
        )
    }

}

ResultsList.propTypes = {
    loaded: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ResultsList;