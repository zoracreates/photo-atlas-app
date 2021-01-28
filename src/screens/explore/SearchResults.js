import React from 'react';
import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import LocationCard from '../../components/cards/LocationCard';
import { Link } from 'react-router-dom';


class SearchResults extends React.Component {
    state = {
        query: this.props.location.search
    }

    renderResults(list) {
        return (
            list.map((location, id) => {

                const { imageUrl, title, distance, saves } = location;
    
                return (
                    <LocationCard key={id} imageUrl={imageUrl} title={title} distance={distance} saves={saves} />
                )
            })
        )

    }

    render() {
        let { locationList } = this.props;

        let {query} = this.state;


        return (
            <div className={`search`}>

                <div className={`dark-background`}>
                    <div className={`container mobile-padding header-container`}>
                        <SearchBar
                            labelText="Location"
                            backSearch
                            placeholder="Search a place"
                            value={query}
                            onChange={(e) => {this.setState({query: e.target.value })}} 
                        />
                        <button className={`search-filter`}>Filter by Subject</button>
                    </div>
                </div>

                <div className={`container`}>
                    <MapWithCards>

                        {locationList 
                            
                            ? 
                        
                            this.renderResults(locationList) 
                            
                            :
                            
                            <p className={`no-results`}>
                                Sorry, no photo spots here yet. You can try a different place,
                                or be the first to <Link to="/add">Add a Spot</Link>!
                            </p> }

    

                    </MapWithCards>
                </div>
            </div>
        )
    }
}

export default SearchResults;