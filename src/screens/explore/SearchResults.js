
import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import LocationCard from '../../components/cards/LocationCard';

function SearchResults(props) {

    let { locationList } = props;

    return (
        <div className={`search`}>

            <div className={`dark-background`}>
                <div className={`container mobile-padding header-container`}>
                    <SearchBar labelText="Location" backSearch placeholder="Search a place" />
                    <button className={`search-filter`}>Filter by Subject</button>
                </div>
            </div>

            <div className={`container`}>
                <MapWithCards>

                    {locationList.map((location, id) => {

                        const { imageUrl, title, distance, saves } = location;

                        return (
                            <LocationCard key={id} imageUrl={imageUrl} title={title} distance={distance} saves={saves} />
                        )
                    })}

                </MapWithCards>
            </div>
        </div>
    )
}

export default SearchResults;