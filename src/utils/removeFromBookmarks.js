import firebase from './firebase/firebaseConfig'

let removeFromBookmarks = (userId, tripId, tripPrivacy, callback) => {
    let database = firebase.database()
    let userBookmarksRef = `userBookmarks/${userId}/${tripId}`
    let tripRef = `${tripPrivacy}Trips/${tripId}/bookmarks/${userId}`

    database.ref(userBookmarksRef).remove().catch(
        error => {
            console.log(error)
        } 
    ).then(
        () => {
            database.ref(tripRef).remove().catch(
                error => {
                    console.log(error)
                } 
            )
        }
    ).then(
        () => callback()
    )
}

export default removeFromBookmarks;