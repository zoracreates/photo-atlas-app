import firebase from './firebase/firebaseConfig'

let getSavesCount = (locationId, callback) => {
    let database = firebase.database();

    database.ref(`appLocations/flickrSourced/${locationId}`).get().then(
        (snapshot) => {
            let count = 0;
            if (snapshot.exists()) {
                let location = snapshot.val();
                count = location['savedCount'];
            }
            return count
        }).catch((error)=> console.log(error)).then((count) => {
            callback(count)
        }
        )

}

export default getSavesCount;