import React from 'react';

import SearchBar from '../../components/forms/SearchBar';
import MapWithCards from '../../components/layout/MapWithCards';
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl';
import getFlickrPlace from '../../utils/flickr/getFlickrPlace';
import getCurrentLocation from '../../utils/getCurrentLocation';
import ResultsList from '../../components/content/ResultsList';
import getGeoSuggestions from '../../utils/getGeoSuggestions'
import SubjectFilters from '../../components/forms/SubjectFilters'

class SearchResults extends React.Component {
    state = {
        query: '',
        loaded: false,
        searchResults: [],
        mapLat: null,
        mapLon: null,
        mapZoom: 10,
        currentLocation: null,
        needLocation: false,
        searchBarSuggestions: '',
        resetFilters: false
    }

    _isMounted = false;

    getSearchReults = (lat, lon, tags) => {

        let searchLat = lat;

        let searchLon = lon;

        let options = {
            "lat": searchLat,
            "lon": searchLon,
            "extras": "geo, tags",
            "accuracy": 6
        }

        if(tags) {
            options.tags = tags
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

                            if (this.state.currentLocation) {
                                currentLat = this.state.currentLocation.latitude;
                                currentLon = this.state.currentLocation.longitude
                            }

                            existingLocations.push(woeId);

                            let location = {
                                "thumbnail": url,
                                "title": title,
                                "saves": 0,
                                "origin": {
                                    "latitude": currentLat,
                                    "longitude": currentLon
                                },
                                "destination": {
                                    "latitude": parseFloat(lat),
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
                    mapZoom: 10,
                    resetFilters: false
                })

            }

        }

        )

    }

    handleInput(e) {
        this.setState(

            { query: e.target.value },

            () => {

                if (!this.state.query) {
                    this.setState({ searchBarSuggestions: '' })
                }
                else {
                    getGeoSuggestions(this.state.query).then(results => this.setState({ searchBarSuggestions: results }))
                }

            })

    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({ searchResults: [], loaded: false, needLocation: false, resetFilters: true });

        if (!this.state.searchBarSuggestions && !this.state.query) {
            this.setState({ loaded: true, mapZoom: 1.5, resetFilters: false })
        } else {

            this.setState({ resetFilters: true });

            let suggestion;

            if(this.state.searchBarSuggestions) {
                suggestion = this.state.searchBarSuggestions[0];
            } else {
                suggestion = {
                    "label" : this.state.query,
                    "y": this.state.mapLat,
                    "x": this.state.mapLon
                }
            }
            

            this.setState({ query: suggestion.label, searchBarSuggestions: '' });

            let address = suggestion.label;

            let lat = suggestion.y;

            let lon = suggestion.x;

            let search = `address=${address}&lat=${lat}&lon=${lon}`

            this.props.history.push(`/explore/?q=&${search}`)

            getCurrentLocation(
                (position) => this.setState({ currentLocation: position.coords },
                () => this.getSearchReults(lat, lon))
            )
        }



    }

    findNearby() {
        this.setState({ searchResults: [], loaded: false, query: 'Current Location' });
        this.props.history.push(`/explore/`)

        getCurrentLocation(
            (position) =>

                this.setState({ currentLocation: position.coords },
                    () => {
                        let lat = this.state.currentLocation.latitude;
                        let lon = this.state.currentLocation.longitude;

                        this.getSearchReults(lat, lon)
                    }),

            () => this.setState({ loaded: true, needLocation: true, mapZoom: 1.5 })
        )
    }

    suggestionClick(suggestion) {

        this.setState({
            searchResults: [],
            loaded: false,
            needLocation: false,
            query: suggestion.label,
            searchBarSuggestions: '',
            resetFilters: true
        });


        let search = `address=${suggestion.label}&lat=${suggestion.lat}&lon=${suggestion.lon}`

        this.props.history.push(`/explore/?q=&${search}`)

        if (!suggestion.lat || !suggestion.lon) {
            this.setState({ loaded: true, mapZoom: 1.5, resetFilters: false })
        } else {
            let lat = suggestion.lat;
            let lon = suggestion.lon;
            getCurrentLocation(
                (position) => this.setState(
                    { currentLocation: position.coords },
                () => this.getSearchReults(lat, lon))
            )
        }

    }

    handleFilters(data) {

        this.setState({ searchResults: [], loaded: false, needLocation: false });

        if (!this.state.searchBarSuggestions && !this.state.query) {
            this.setState({ loaded: true, mapZoom: 1.5 })
        } else {

            let suggestion = {
                "label" : this.state.query,
                    "y": this.state.mapLat,
                    "x": this.state.mapLon
            }
            

            let address = suggestion.label;

            let lat = suggestion.y;

            let lon = suggestion.x;

            let search = `address=${address}&lat=${lat}&lon=${lon}`

            this.props.history.push(`/explore/?q=&${search}`)

            getCurrentLocation(
                (position) => this.setState({ currentLocation: position.coords },
                () => this.getSearchReults(lat, lon, data))
            )
        }
    }

    componentDidMount() {
        let query = decodeURIComponent(this.props.location.search);

        let searchParams = new URLSearchParams(query);

        this._isMounted = true

        if (!searchParams.has("lon") || !searchParams.has("lat")) {

            this._isMounted && this.setState({ loaded: true, mapZoom: 1.5 })

        } else {
            let address = searchParams.get("address");

            let lat = searchParams.get("lat");

            let lon = searchParams.get("lon");

            this._isMounted && this.setState({ query: address });

            getCurrentLocation(
                (position) => this._isMounted && this.setState({ currentLocation: position.coords },

                    this.getSearchReults(lat, lon)),

                () => this.getSearchReults(lat, lon)
            )
        }
    }


    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {

        let { query, searchResults, loaded, mapLat, mapLon, mapZoom, needLocation, searchBarSuggestions } = this.state;

        return (
            <div className={`search`}>

                <div className={`dark-background`}>
                    <div className={`container mobile-padding header-container`}>
                        <SearchBar
                            labelText="Location"
                            backSearch
                            placeholder="Search a place"
                            value={query}
                            onChange={(e) => { this.handleInput(e) }}
                            onClick={(e) => this.handleSubmit(e)}
                            searchSuggestions={searchBarSuggestions}
                            handleSuggestion={(suggestion) => { this.suggestionClick(suggestion) }}
                        />
                        <SubjectFilters handleSubmit={(data)=> this.handleFilters(data)} resetFilters={this.state.resetFilters}/>
                        <button className={`search-filter`} onClick={() => { this.findNearby() }}>Spots Near Me</button>
                    </div>
                </div>

                <div className={`container`}>

                    <MapWithCards
                        mapLoctaions={searchResults}
                        mapLat={mapLat}
                        mapLon={mapLon}
                        mapZoom={mapZoom}

                    >
                        <ResultsList loaded={loaded} list={searchResults} needLocation={needLocation} />

                    </MapWithCards>
                </div>
            </div>
        )
    }
}

export default SearchResults;