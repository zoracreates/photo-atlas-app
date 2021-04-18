import React from 'react'
import PropTypes from 'prop-types'
import PrivateTab from '../../components/navigation/PrivateTab'
import getUserTrips from '../../utils/getUserTrips'
import SearchBar from '../../components/forms/SearchBar'
import UnfilteredTrips from '../../components/content/UnfilteredTrips'
import FilteredTrips from '../../components/content/FilteredTrips'

class MyTrips extends React.Component {

    state = {
        existingTrips: [],
        loading: true,
        searching: false,
        loadingSearchResults: false,
        searchResults: [],
        searchTerms: ''
    }
    _isMounted = false;

    getTripsList() {
        let userId = this.props.userId;
        if (this.props.isAuthenticated) {
            getUserTrips(userId, (tripsList) => {
                if (tripsList.length > 0) {
                    this._isMounted &&  this.setState({ existingTrips: tripsList, loading: false })
                } else {
                    this._isMounted && this.setState({ loading: false })
                }
            }
            )
        }
    }

    handleSearchInput(e) {
        this.setState({ searchTerms: e.target.value }, () => {
            if (!this.state.searchTerms) {
                this.setState({ searching: false })
            }
        })
    }

    getSearchResults(e) {
        e.preventDefault();

        //use search terms to create searcResults array
        let existingTrips = this.state.existingTrips;
        let results = []
        let searchTerms = this.state.searchTerms.toLowerCase();
        
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

    tripsList(existingTrips) {
        let {searching, loadingSearchResults, searchResults} = this.state;
        if (!searching) {
            return <UnfilteredTrips existingTrips={existingTrips}/>
        } else {
            return <FilteredTrips loading={loadingSearchResults} searchResults={searchResults}/>
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getTripsList()
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            this.getTripsList()
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderUserTrips() {

        let { existingTrips, loading } = this.state;

        while (loading) {
            return (
                <div aria-live="polite">
                    <p>Getting Trips...</p>
                </div>
            )
        } 
        
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
                    </>)

            } else {

                return (
                    <div aria-live="polite">
                        <p>No trips here yet.</p>
                    </div>
                )


            }

    }

    render() {
        return (
            <>
                <PrivateTab
                    componentContent={() => this.renderUserTrips()}
                    logInLocation={"trips"}
                    isVerified={this.props.isVerified}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </>
        )
    }

}

MyTrips.propTypes = {
    userId: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isVerified: PropTypes.bool
}



export default MyTrips;