import React from 'react';

import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl';
import getFlickrPlace from '../../utils/flickr/getFlickrPlace';
import getCurrentLocation from '../../utils/getCurrentLocation';
import ResultsList from '../../components/content/ResultsList';


class SearchResults extends React.Component {
    state = {
        query: decodeURIComponent(this.props.location.search),
        loaded: false,
        searchResults: [],
        mapLat: null,
        mapLon: null,
        mapZoom: 10,
        currentLocation: null
    }


    getSearchReults = (searchParams) => {
        //test with Boston lat=42.3601&lon=-71.0589
        //test with PR lat=18.2208&lon=-66.5901
        //test with this cool place lat=42.3601&lon=42.3601
        //hatillo &lat=18.4285&lon=-66.7875
        //middle of the pacific ocean, use for testing no location results lat=-48.52&lon=-123.23 

        /* use entered location to search flickr*/

        let searchLat = searchParams.get("lat");

        let searchLon = searchParams.get("lon");

        let options = {
            "lat": searchLat,
            "lon": searchLon,
            "extras": "geo",
            "accuracy": 6
        }

        getFlickrPhotos(options).then(data => {
            
            let photos;
            
            if (data) {
                photos = data.photos
            }
            
            
            if (!photos) {
                return this.setState({ loaded: true })
            }

            else {
                
                photos = photos.photo

                let existingLocations = []

                let list = [];


                photos.forEach(

                    photo => {

                        let url = createFlickrImageUrl(photo);

                        let title = photo.title;

                        let lat = photo.latitude;
                        
                        let lon = photo.longitude;

                        let woeId = photo.woeid;

                        if (woeId && !existingLocations.includes(woeId)) { //in location view use woeid to search for other photos

                            let currentLat;
                            let currentLon;

                            if(this.state.currentLocation) {
                                currentLat = this.state.currentLocation.latitude;
                                currentLon = this.state.currentLocation.longitude
                            }
                        
                            existingLocations.push(woeId);

                            let location = {
                                "thumbnail": url,
                                "title": title, // set to empty string after geocoding is set for name
                                "saves": 0,
                                "origin": {
                                    "latitude" : currentLat,
                                    "longitude": currentLon
                                },
                                "destination": {
                                    "latitude" : parseFloat(lat),
                                    "longitude": parseFloat(lon)
                                }
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
                    loaded: true,
                    mapLat: parseFloat(searchLat),
                    mapLon: parseFloat(searchLon),
                    mapZoom: 10
                })

            }

        }

        )

    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({ searchResults: [], loaded: false });

        let search = decodeURIComponent(this.state.query);

        this.props.location.search = `?q=&${search}`;

        this.props.history.push(`/explore/?q=&${search}`)


        let searchParams = new URLSearchParams(this.state.query);

        if (!searchParams.has("lon") || !searchParams.has("lat")) {
            this.setState({ loaded: true, mapZoom: 1.5 })
        } else {
            getCurrentLocation(
                (position) => this.setState({ currentLocation: position.coords }, this.getSearchReults(searchParams)),
                () => this.getSearchReults(searchParams)
            )
        }

    }


    componentDidMount() {
        let searchParams = new URLSearchParams(this.state.query);

        if (!searchParams.has("lon") || !searchParams.has("lat")) {
            this.setState({ loaded: true, mapZoom: 1.5 })
        } else {
            getCurrentLocation(
                (position) => this.setState({ currentLocation: position.coords }, this.getSearchReults(searchParams)),
                () => this.getSearchReults(searchParams)
            )
        }
    }



    render() {

        let { query, searchResults, loaded, mapLat, mapLon, mapZoom } = this.state;

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
                        <button className={`search-filter`}>Spots Near Me</button>
                    </div>
                </div>

                <div className={`container`}>
                    
                    <MapWithCards
                        mapLoctaions={searchResults}
                        mapLat={mapLat}
                        mapLon={mapLon}
                        mapZoom={mapZoom}

                    >
                        <ResultsList loaded={loaded} list={searchResults} />
                        
                    </MapWithCards>
                </div>
            </div>
        )
    }
}

export default SearchResults;