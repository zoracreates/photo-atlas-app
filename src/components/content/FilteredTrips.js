import OneToTwoCols from '../layout/OneToTwoCols'
import TripCard from '../cards/TripCard'

function FilteredTrips({loading, searchResults}) {
   
    while (loading) {
        return (
            <div aria-live="polite">
                <p>Getting trips...</p>
            </div>
        )
    }

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

export default FilteredTrips;