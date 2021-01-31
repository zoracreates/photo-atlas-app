async function getFlickrPhotoInfo(photoId, handleResponse =
    (responseData) => console.log(responseData)) {

    let url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.photos.getInfo&format=json&nojsoncallback=1}&photo_id=${photoId}`

    await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json().then(data => {
                handleResponse(data);
            });
        }).catch(error => {
            alert(error)
        }
        )
};

export default getFlickrPhotoInfo;

/*
USAGE

The function getFlickrPhotoInfo returns information about a photo, including its author and a link to the gallery the photo
belongs to or the Flickr photo page

receives two parameters photoId and handleResponse.

photoId is a flickr phot id needed to get the information for a flickr photo 

The second parameter, handleResponse, is a callback indicating what to do once the request is received. 
As a default handleResponse logs the received results into the browser console, but a different function may be passed. 
*/
