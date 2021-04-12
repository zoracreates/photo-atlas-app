import React from 'react'
import PropTypes from 'prop-types';
import PublicTrips from './PublicTrips'
import MyTrips from './MyTrips'
import BookmarkedTrips from './BookmarkedTrips'




class Trips extends React.Component {

    state = {
        tab: 'public'
    }

    renderContent() {
        let { tab } = this.state

        // console.log(tab)
        if (tab === 'public') {
            return <PublicTrips />
        }

        if (tab === 'private') {
            return (
                <MyTrips
                    isVerified={this.props.isVerified}
                    isAuthenticated={this.props.isAuthenticated}
                    userId={this.props.userId}
                />
            )
        }

        if (tab === 'bookmarks') {
            return (
                <BookmarkedTrips
                    isVerified={this.props.isVerified}
                    isAuthenticated={this.props.isAuthenticated}
                    userId={this.props.userId}
                />

            )
        }


    }

    switchTabs(value) {
        this.setState({ tab: value })

    }

    render() {
        let { tab } = this.state;
        return (
            <>
                <div className={`container trips mobile-padding`}>
                    <h2>Trips</h2>
                    <ul className={`tabs`}>
                        <li>
                            <button
                                className={tab === 'public' ? 'active' : 'inactive'}
                                onClick={() => this.switchTabs('public')}>Public Trips
                            </button>
                        </li>
                        <li>
                            <button
                                className={tab === 'private' ? 'active' : 'inactive'}
                                onClick={() => this.switchTabs('private')}>
                                My Trips
                            </button>
                        </li>

                        <li>
                            <button
                                className={tab === 'bookmarks' ? 'active' : 'inactive'}
                                onClick={() => this.switchTabs('bookmarks')}>
                                Bookmarks
                            </button>
                        </li>


                    </ul>
                    {this.renderContent()}
                </div>
            </>
        )
    }

}

Trips.propTypes = {
    userId: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isVerified: PropTypes.bool
}



export default Trips;