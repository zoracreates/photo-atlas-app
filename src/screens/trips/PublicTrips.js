import React from 'react'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'
import getPublicTrips from '../../utils/getPublicTrips'
import SearchBar from '../../components/forms/SearchBar'

class PublicTrips extends React.Component {
    state = {
        existingTrips: [],
        loading: true,
        searching: false,
        loadingSearchResults: false,
        searchResults: [],
        searchTerms: ''
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        getPublicTrips((tripsList) => {
            this._isMounted && this.setState({ existingTrips: tripsList, loading: false })
        })
    }

    handleSearchInput(e) {
        this.setState({ searchTerms: e.target.value }, () => {
            if (!this.state.searchTerms) {
                this.setState({ searching: false })
            }
        })
    }

    getSearchResults(e) {
        //use search terms to create searcResults array
        let existingTrips = this.state.existingTrips;
        let results = []
        let searchTerms = this.state.searchTerms.toLowerCase();
        e.preventDefault();
        this.setState({ searching: true, loadingSearchResults: true })

        existingTrips.forEach(trip => {
            let title = trip.title.toLowerCase()
            let tags = trip.tags.toLowerCase()

            let titleMatch = title.includes(searchTerms)
            let tagsMatch = tags.includes(searchTerms)

            if (titleMatch || tagsMatch) {

                results.push(trip)

            }
        }

        )

        this.setState({ loadingSearchResults: false, searchResults: results })

    }

    unfilteredTrips(existingTrips) {
        return (<>
            <div aria-live="polite" className="sr-only">
                <p>Showing public trips</p>
            </div>
            <OneToTwoCols>
                {existingTrips.map((trip, index) => {
                    let {
                        thumbnail,
                        title,
                        locationsCount,
                        privacy,
                        tripId,
                        authorId } = trip;

                    return (
                        <TripCard
                            key={index}
                            thumbnail={thumbnail}
                            title={title}
                            tripId={tripId}
                            privacy={privacy}
                            locationsCount={locationsCount}
                            authorId={authorId}
                        />
                    )
                })}
            </OneToTwoCols>
        </>)
    }

    filteredTrips() {
        let { loadingSearchResults, searchResults } = this.state;

        if (loadingSearchResults) {
            return (
                <div aria-live="polite">
                    <p>Getting Trips...</p>
                </div>
            )
        } else {
            if (searchResults.length > 0) {
                return (
                    <>
                        <div aria-live="polite" className="sr-only">
                            <p>Showing search results</p>
                        </div>
                        <OneToTwoCols>
                            {searchResults.map((trip, index) => {
                                let {
                                    thumbnail,
                                    title,
                                    locationsCount,
                                    privacy,
                                    tripId,
                                    authorId } = trip;

                                return (
                                    <TripCard
                                        key={index}
                                        thumbnail={thumbnail}
                                        title={title}
                                        tripId={tripId}
                                        privacy={privacy}
                                        locationsCount={locationsCount}
                                        authorId={authorId}
                                    />
                                )
                            })}
                        </OneToTwoCols>
                    </>
                )
            } else {
                return <p>Sorry, no trips match your search criteria.</p>
            }
        }
    }

    tripsList(existingTrips) {
        if (!this.state.searching) {
            return this.unfilteredTrips(existingTrips)
        } else {
            return this.filteredTrips()
        }
    }

    renderPublicTrips() {
        let { existingTrips, loading } = this.state;

        if (loading) {
            return (
                <div aria-live="polite">
                    <p>Getting Trips...</p>
                </div>
            )
        } else {
            if (existingTrips.length > 0) {
                return (
                    <>
                        <SearchBar
                            className="border-search"
                            id="trips-search"
                            placeholder="cityscapes"
                            labelText="Search trips by tags or title"
                            value={this.state.searchTerms}
                            onChange={(e) => this.handleSearchInput(e)}
                            onClick={(e) => this.getSearchResults(e)}
                        />
                        {this.tripsList(existingTrips)}
                    </>
                )
            } else {
                return (
                    <div aria-live="polite">
                        <p>No trips here yet.</p>
                    </div>
                )
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                {this.renderPublicTrips()}
            </>
        )
    }

}



export default PublicTrips;