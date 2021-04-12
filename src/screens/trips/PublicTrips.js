import React from 'react'
import OneToTwoCols from '../../components/layout/OneToTwoCols'
import TripCard from '../../components/cards/TripCard'
import getPublicTrips from '../../utils/getPublicTrips'




class PublicTrips extends React.Component {
    state = {
        existingTrips: [],
        loading: true
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        getPublicTrips((tripsList) => {
            this._isMounted && this.setState({ existingTrips: tripsList, loading: false })
        })
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
                return (<>
                    <div aria-live="polite" className="sr-only">
                        <p>Showing all trips</p>
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