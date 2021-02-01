import React from 'react';

import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import LocationCard from '../../components/cards/LocationCard';
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl';
import getFlickrPlace from '../../utils/flickr/getFlickrPlace';



class SearchResults extends React.Component {
    state = {
        query: decodeURIComponent(this.props.location.search),
        loaded: false,
        searchResults: [],
        resultsCount: 0 
    }


    getSearchReults = (searchParams) => {

        if (!searchParams.has("lon") || !searchParams.has("lat")) {
            this.setState({ loaded: true })
        }

        if (searchParams.has("lon") && searchParams.has("lat")) {
            //test with Boston lat=42.3601&lon=-71.0589
            //test with PR lat=18.2208&lon=-66.5901

            let options = {
                "lat": searchParams.get("lat"),
                "lon": searchParams.get("lon"),
                "extras": "geo",
                "accuracy": 6
            }

            getFlickrPhotos(options).then(data => {

                let photos = data.photos.photo;


                let locations = []

                let list = [];


                photos.forEach(

                    photo => {

                        let url = createFlickrImageUrl(photo);

                        let title = photo.title;

                        let lat = photo.latitude;

                        let lon = photo.longitude;

                        let woeId = photo.woeid;

                        if (woeId && !locations.includes(woeId)) { //in location view use woeid to search for other photos


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

                this.setState({
                    searchResults: list,
                    resultsCount: list.length,
                    loaded: true
                })

            }

            )
        }

    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({ searchResults: [], loaded: false });

        let search = decodeURIComponent(this.state.query);

        this.props.location.search = `?q=&${search}`;

        this.props.history.push(`/explore/?q=&${search}`)

        let searchParams = new URLSearchParams(this.state.query);

        this.getSearchReults(searchParams);

    }

    renderResults(loaded, resultsList, resultsCount) {


        if (!loaded) {
            return <p className={`results-status`}>Getting Locations...</p>
        }

        if (loaded && resultsCount > 0) {
            return (
                resultsList.map((location, id) => {

                    const { thumbnail, title, distance, saves } = location;

                    return (
                        //make these into links where the search param should be the photo id
                        <LocationCard key={id} thumbnail={thumbnail} title={title} distance={distance} saves={saves} />
                    )

                })
            )

        } else {
            return (
                <p className={`results-status`}>
                    Sorry, no photo spots here yet. Let's checkout a different location!
                </p>
            )
        }




    }

    componentDidMount() {
        let searchParams = new URLSearchParams(this.state.query);
        this.getSearchReults(searchParams)
    }



    render() {

        let { query, searchResults, resultsCount, loaded } = this.state;

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
                            onClick={(e) => this.handleSubmit(e)}
                        />
                        <button className={`search-filter`}>Filter by Subject</button>
                    </div>
                </div>

                <div className={`container`}>
                    <MapWithCards>

                        {this.renderResults(loaded, searchResults, resultsCount)}

                    </MapWithCards>
                </div>
            </div>
        )
    }
}

export default SearchResults;