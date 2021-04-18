import firebase from './firebase/firebaseConfig'

let getUserTrips = (userId, callback) => {

    let database = firebase.database();
    let existingTrips = [];

    if(userId) {
        database.ref(`userBookmarks/${userId}`).get().then((snapshot) => {

            if (snapshot.exists()) { 
                let trips = snapshot.val();
    
    
                for (const tripId in trips) { 
                    let trip = trips[tripId]
    
                    //get privacy setting 
                    let privacy = trip['tripPrivacy']
    
                    let tripRef = `${privacy}Trips/${tripId}`
    
                    database.ref(`${tripRef}`).get().catch(error=>console.log(error)).then(
                        (snapshot) => {
                            if (snapshot.exists()) {
                                let tripData = snapshot.val()
                                //get title
                                let title = tripData['tripName']
    
                                //get locationsCount
                                let locationsCount = tripData['locationsCount']

                                //get authorId
                                let authorId = tripData['author']
    
                                //get thumnail
                                let thumbnail = tripData['featuredImg']

                                //get tags
                                let tags = tripData['tags']
    
    
                                let existingTripUpdate = {
                                    tripId: tripId,
                                    thumbnail: thumbnail,
                                    title: title,
                                    locationsCount: locationsCount,
                                    privacy: privacy,
                                    authorId: authorId,
                                    tags: tags ? tags : ''
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

}

export default getUserTrips;