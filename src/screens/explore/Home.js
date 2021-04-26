import React from 'react';
import SearchBar from '../../components/forms/SearchBar';
import TitleCardCols from '../../components/layout/TitleCardCols'
import TitleCard from '../../components/cards/TtitleCard'
import getFlickrPhotos from '../../utils/flickr/getFlickrPhotos';
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
        searchBarSuggestions: '',
        default: false
    };

    _isMounted = false;

    handleSubmit(e) {
        e.preventDefault();

        // use the first suggestion to search
        if (this.state.searchBarSuggestions) {
            let suggestion = this.state.searchBarSuggestions[0]

            this.setState({ query: suggestion.label })

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

                if (!this.state.query) {
                    this.setState({ searchBarSuggestions: '' })
                }
                else {
                    getGeoSuggestions(this.state.query).then(results => this.setState({ searchBarSuggestions: results }))
                }

            })

    }

    renderNearby(list) {

        if (!this.state.errorMessage && this.state.noLocations) {
            return <p aria-live="polite">Looks like there aren't any photo spots nearby yet. Let's explore a different location</p>
        }

        if (!this.state.errorMessage && this.state.currentLocation) {
            return (
                <>
                <h2 className={`h5-font`}>Explore Nearby</h2>
                    <p aria-live="polite" className="sr-only">Showing nearby locations</p>
                    <TitleCardCols>
                        {list.map((location, id) => {
                            const { thumbnail, title, src, locationId, woeId } = location;
                            return (
                                //make these into links where the search param should be the photo id
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

        return <p>Getting photo spots...</p>
    }

    renderDefaultLocations(list) {

        while (list.length === 0) {
            return (
                <>
                    <p>Getting photo spots...</p>
                </>
            )
        }
        return (
            <>
                <h2 className={`h5-font`}>Explore Cabo Rojo, Puerto Rico</h2>
                <p aria-live="polite" className="sr-only">Showing Cabo Rojo Puerto Rico</p>
                <TitleCardCols>
                    {list.map((location, id) => {
                        const { thumbnail, title, src, locationId, woeId } = location;
                        return (
                            //make these into links where the search param should be the photo id
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


    getNearbyLocations = () => {


        let location = this.state.currentLocation


        if (location) {


            let currentLat = location.latitude;

            let currentLon = location.longitude;
            let options = {
                "lat": currentLat,
                "lon": currentLon,
                "accuracy": 16,
                "extras": "geo, tags, url_n"
            }

            //create a list of locations
            let existingLocations = [];

            let list = [];

            getFlickrPhotos(options).then(data => {

                if (!data) {
                    return undefined
                }

                let photos = data.photos.photo;

                if (!photos[0]) {
                    this.setState({ noLocations: true })
                }

                else {

                    photos.forEach(

                        photo => {

                            let url = photo.url_n


                            let title = photo.title;

                            let woeId = photo.woeid;

                            let locationId = photo.id;

                            let tags = photo.tags;

                            //prevent duplicate locations and locations with no tags
                            if (woeId && !existingLocations.includes(woeId) && tags) {

                                existingLocations.push(woeId);

                                let location = {
                                    "src": "flickr",
                                    "locationId": locationId,
                                    "thumbnail": url,
                                    "title": title,
                                    "woeId": woeId
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

    suggestionClick(suggestion, e) {
        this.setState({ query: suggestion.label })
        let search = `address=${suggestion.label}&lat=${suggestion.lat}&lon=${suggestion.lon}`
        this.props.history.push(`/explore/?q&${search}`);
    }

    componentDidMount() {

        this._isMounted = true;

        let defaultLocation = {
            latitude: 18.087,
            longitude: -67.1459
        }

        let setDefault = () => {
            if (!this.state.currentLocation) {
                this.setState(
                    { currentLocation: defaultLocation, default: true },
                    () => this.getNearbyLocations()
                )
            }
        }

        getCurrentLocation(
            position =>  {
                if( this._isMounted && !this.state.default) {
                    this.setState({ currentLocation: position.coords}, () => this.getNearbyLocations())
                }
            },
            err => this._isMounted && this.setState({ errorMessage: err.message }, ()=>setDefault())
        )

        setTimeout(function(){ setDefault() }, 3500);


    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    renderLocations(locationResults) {
        if (!this.state.default) {
            return (
                <>
                    {this.renderNearby(locationResults)}
                </>
            )
        } else {
            return (
                <>
                    {this.renderDefaultLocations(locationResults)}
                </>
            )
        }
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

                            handleSuggestion={(suggestion, e) => { this.suggestionClick(suggestion) }}
                        />


                    </div>
                </div>
                <div className={`container mobile-padding`}>

                    {this.renderLocations(locationResults)}
                </div>

            </div>
        )

    }

}

export default Home;