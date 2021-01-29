import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import LocationCard from '../../components/cards/LocationCard';
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl';

class SearchResults extends React.Component {
    state = {
        query: this.props.location.search,
        photos: []
    }

    componentDidMount() {
     let searchParams = new URLSearchParams(this.state.query);

     if(searchParams.has("lon") && searchParams.has("lat")) {
        //test with ?q&lat=42.3601&lon=-71.0589
        let options = {
                "lat": searchParams.get("lat"),
                "lon": searchParams.get("lon"),
                "extras" : "geo",
                "sort" : "interestingness-desc"
        }

       getFlickrPhotos(options)
        .then(data =>  {
            let photoData = data.photos.photo[0]
            let url =createFlickrImageUrl(photoData)
        
            this.setState({photos: [{"imageUrl" : url}]})
        });
  
    }


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
        let locationList  = this.state.photos;

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