import firebase from './firebase/firebaseConfig'

let getPublicTrips = (callback) => {
   
    let database = firebase.database();
    let existingTrips = [];

    database.ref(`publicTrips`).get().then((snapshot) => { 

        let trips = snapshot.val();


        for (const tripId in trips) {
     
                    //get title
                    let title = trips[tripId]['tripName']

                    //get locationsCount
                    let locationsCount = trips[tripId]['locationsCount']

                    //get thumnail
                    let thumbnail = trips[tripId]['featuredImg']

                    //get authorId
                    let authorId = trips[tripId]['author']

                    //get tags
                    let tags = trips[tripId]['tags']

                    let existingTripUpdate = {
                        tripId: tripId,
                        thumbnail: thumbnail,
                        title: title,
                        locationsCount: locationsCount,
                        privacy: 'public',
                        authorId: authorId,
                        tags: tags ? tags : ''
                    }

                existingTrips.push(existingTripUpdate)
        }

        return existingTrips
    }).catch(error => console.log(error)).then((existingTrips) => callback(existingTrips))
}

export default getPublicTrips;