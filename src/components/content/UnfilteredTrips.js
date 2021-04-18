import OneToTwoCols from '../layout/OneToTwoCols'
import TripCard from '../cards/TripCard'


function UnfilteredTrips({existingTrips}) {
    return (<>
        <div aria-live="polite" className="sr-only">
            <p>Showing trips</p>
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

export default UnfilteredTrips;