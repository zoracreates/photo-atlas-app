import firebase from './firebase/firebaseConfig'

let getUserTrips = (userId, callback, locationId = null) => {

    let database = firebase.database();
    let existingTrips = [];

    database.ref(`userTrips/${userId}`).get().then((snapshot) => {

        if (snapshot.exists()) { 
            let trips = snapshot.val();


            for (const tripId in trips) {
                let trip = trips[tripId]

                //get privacy setting 
                let privacy = trip['tripPrivacy']
                let isPublic = privacy === 'public';
                let isShared = trip['isShared']

                let tripRef = `${privacy}Trips/${tripId}`

                database.ref(`${tripRef}`).get().then(
                    (snapshot) => {
                        if (snapshot.exists()) {
                            let tripData = snapshot.val()
                            //get title
                            let title = tripData['tripName']

                            //get locationsCount
                            let locationsCount = tripData['locationsCount']

                            //get thumnail
                            let thumbnail = tripData['featuredImg']

                            //see if location is in trip
                            let inTrip;

                            if (locationId) {
                                let locations = tripData.locations;


                                if (locations) {
                                    let location = locations[locationId]
                                    if (location) {
                                        inTrip = true
                                    } else {
                                        inTrip = false
                                    }
                                } else {
                                    inTrip = false
                                }
                            }

                            let existingTripUpdate = {
                                tripId: tripId,
                                thumbnail: thumbnail,
                                title: title,
                                locationsCount: locationsCount,
                                isPublic: isPublic,
                                isShared: isShared,
                                inTrip: inTrip
                            }

                            existingTrips.push(existingTripUpdate)

                            return existingTrips
                        } else {
                            console.log(`issue fetching: ${tripRef}`)
                        }
                    }
                ).catch((error) => console.log(`could not fetch trips: ${error}`)).then((existingTrips) => callback(existingTrips))

            }

        } else {
            callback(existingTrips)
        }

    })
}

export default getUserTrips;