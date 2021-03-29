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
    }

    renderPublicTrips() {
        let { existingTrips, loading } = this.state;

        getPublicTrips((tripsList) => {
            this._isMounted && this.setState({ existingTrips: tripsList, loading: false })
        })

        if (loading) {
            return (
                <div aria-live="polite">
                    <p>Getting Trips...</p>
                </div>
            )
        } else {
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
                        isPublic,
                        tripId } = trip;

                    return (
                        <TripCard
                            key={index}
                            thumbnail={thumbnail}
                            title={title}
                            tripId={tripId}
                            isPublic={isPublic}
                            locationsCount={locationsCount}
                        />
                    )
                })}
                </OneToTwoCols>
            </>)

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