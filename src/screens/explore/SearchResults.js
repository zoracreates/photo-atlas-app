import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import LocationCard from '../../components/cards/LocationCard';
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl';
import getFlickrPlace from '../../utils/flickr/getFlickrPlace';

class SearchResults extends React.Component {
    state = {
        query: this.props.location.search,
        searchResults: [],
        resultsCount: .5 // there's probably a better way to do this
    }

    componentDidMount() {
        let searchParams = new URLSearchParams(this.state.query);

        if (searchParams.has("lon") && searchParams.has("lat")) {
            //test with Boston ?q&lat=42.3601&lon=-71.0589
            //test with PR q&lat=18.2208&lon=-66.5901
            let options = {
                "lat": searchParams.get("lat"),
                "lon": searchParams.get("lon"),
                "extras": "geo",
                "accuracy" : 6
            }

            getFlickrPhotos(options).then(data => {

                let photos = data.photos.photo;
            console.log(photos[3]);
                console.log(`photos count = ${photos.length}`)

                let locations = []

                let list = [];


                photos.forEach(

                    photo => {

                        let url = createFlickrImageUrl(photo);

                        let title = photo.title;

                        let lat = photo.latitude;

                        let lon = photo.longitude;

                        let woeId = photo.woeid;

                        if (woeId && !locations.includes(woeId)) {


                            locations.push(woeId);

                            let location = {
                                "thumbnail": url,
                                "title": title, // set to empty string after geocoding is set for name
                                "distance": parseInt(lon + lat),
                                "saves": 0
                            }

                            let place = async (options) => {
                                let placeName = await getFlickrPlace(options);
                                return placeName
                            }

                            place({ "woeId": woeId }).then(placeName => {

                                if (placeName) {
                                    location.title = placeName

                                }
                                /*else
                                use geo decoding to name the place
                                
                                */

                            }).then(

                                list.push(location)

                            )
                        }
                    }
                )

                this.setState({ searchResults: list, resultsCount: list.length })
                console.log(`results count = ${this.state.resultsCount}`)
                console.log(`locations count = ${locations.length}`)

            }

            )
        }
    }



    renderResults(resultsList) {
        return (
            resultsList.map((location, id) => {

                const { thumbnail, title, distance, saves } = location;

                return (
                    <LocationCard key={id} thumbnail={thumbnail} title={title} distance={distance} saves={saves} />
                )
            })
        )

    }

    render() {

        let { query, searchResults, resultsCount } = this.state;



        return (
            <div className={`search`}>

                <div className={`dark-background`}>
                    <div className={`container mobile-padding header-container`}>
                        <SearchBar
                            labelText="Location"
                            backSearch
                            placeholder="Search a place"
                            value={query}
                            onChange={(e) => { this.setState({ query: e.target.value }) }}
                        />
                        <button className={`search-filter`}>Filter by Subject</button>
                    </div>
                </div>

                <div className={`container`}>
                    <MapWithCards>

                        {resultsCount > 0

                            ?

                            this.renderResults(searchResults)

                            :

                            <p className={`no-results`}>
                                Sorry, no photo spots here yet. You can try a different place,
                                or be the first to <Link to="/add">Add a Spot</Link>!
                            </p>}

                    </MapWithCards>
                </div>
            </div>
        )
    }
}

export default SearchResults;