import React from 'react';
import SearchBar from '../../components/forms/SearchBar';
import TwoToThreeCols from '../../components/layout/TwoToThreeCols'
import TitleCard from '../../components/cards/TtitleCard'
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
import createFlickrImageUrl from '../../utils/flickr/createFlickrImageUrl';
import getFlickrPlace from '../../utils/flickr/getFlickrPlace';
import getCurrentLocation from '../../utils/getCurrentLocation';
import getGeoSuggestions from '../../utils/getGeoSuggestions'

class Home extends React.Component {

    state = {
        query: '',
        currentLocation: null,
        errorMessage: '',
        noLocations: false,
        locationResults: [],
        searchBarSuggestions: ''
    };

    _isMounted = false;

    handleSubmit(e) {
        e.preventDefault();

        // use the first suggestion to search
        if(this.state.searchBarSuggestions) {
            let suggestion = this.state.searchBarSuggestions[0]

            this.setState({query:suggestion.label})

            //geocoding search means x = lat and y = lon https://smeijer.github.io/leaflet-geosearch/usage
            let search = `address=${suggestion.label}&lat=${suggestion.y}&lon=${suggestion.x}`
            this.props.history.push(`/explore/?q&${search}`);
        }
        else {
            return undefined
        }
    }

    
    handleInput(e) {
        this.setState(
           
            { query: e.target.value }, 
            
            () => {

                if(!this.state.query) {
                    this.setState({searchBarSuggestions: ''})
                }
                else {
                    getGeoSuggestions(this.state.query).then(results =>this.setState({searchBarSuggestions: results}))
                }
           
        })
       
    }

    renderNearby(list) {

        if (this.state.errorMessage && !this.state.currentLocation) {
            console.log(`Error: ${this.state.errorMessage}`)
            return <p aria-live="polite" >Share your location to explore what's nearby.</p>
        }

        if (!this.state.errorMessage && this.state.noLocations) {
            return <p aria-live="polite">Looks like there aren't any photo spots nearby yet. Let's explore a different location</p>
        }

        if (!this.state.errorMessage && this.state.currentLocation) {
            return (
                <>
                <p aria-live="polite" className="sr-only">Showing nearby locations</p>
                <TwoToThreeCols >
                    {list.map((location, id) => {
                        const { thumbnail, title } = location;
                        return (
                            //make these into links where the search param should be the photo id
                            <TitleCard key={id} thumbnail={thumbnail} title={title} />
                        )

                    })}
                </TwoToThreeCols>
                </>
            )

        }

        return <p>Getting nearby photo spots...</p>
    }


    getNearbyLocations = () => {

        if (this.state.currentLocation) {

            let currentLat = this.state.currentLocation.latitude;

            let currentLon = this.state.currentLocation.longitude;
            let options = {
                "lat": currentLat,
                "lon": currentLon,
                "accuracy": 6,
                "extras": "geo"
            }

            getFlickrPhotos(options).then(data => {

                if (!data) {
                    return undefined
                }

                let photos = data.photos.photo;

                let existingLocations = []

                let list = [];

                if (!photos[0]) {
                    this.setState({ noLocations: true })
                }

                else {

                    photos.forEach(

                        photo => {

                            let url = createFlickrImageUrl(photo);

                            let title = photo.title;

                            let woeId = photo.woeid;

                            if (woeId && !existingLocations.includes(woeId)) {

                                existingLocations.push(woeId);

                                let location = {
                                    "thumbnail": url,
                                    "title": title,
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
                        locationResults: list,
                        noLocations: false
                    })


                }
            }

            )
        }

    }

    suggestionClick(suggestion) {
        this.setState({query:suggestion.label})
        let search = `address=${suggestion.label}&lat=${suggestion.lat}&lon=${suggestion.lon}`
        this.props.history.push(`/explore/?q&${search}`);
    }

    componentDidMount() {

        this._isMounted = true;

        this._isMounted && getCurrentLocation(
            position => this.setState({ currentLocation: position.coords }, () => { this.getNearbyLocations() }),
            err => this.setState({ errorMessage: err.message })
        )

    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {
        let { query, locationResults, searchBarSuggestions } = this.state;

        return (
            <div className={`home`}>
                <div className={`background-image`}>
                    <div className={`container mobile-padding`}>
                        <p className={`home-heading`}>Photo Atlas</p>
                        <h2 className={`h5-font`}>Find new places to capture your best work.</h2>
                        <SearchBar

                            method={`get`}

                            value={query}

                            onChange={(e) => { this.handleInput(e) }}

                            labelText="Where do you want to go?"

                            placeholder="Search a place"

                            onClick={(e) => this.handleSubmit(e)}

                            searchSuggestions={searchBarSuggestions}

                            handleSuggestion={(suggestion)=> {this.suggestionClick(suggestion)}}
                        />


                    </div>
                </div>
                <div className={`container mobile-padding`}>
                    <h2 className={`h5-font`}>Explore Nearby</h2>
                    {this.renderNearby(locationResults)}
                </div>

            </div>
        )

    }

}

export default Home;