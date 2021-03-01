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
            console.log(error)
        }
        )
};

export default getFlickrPhotoInfo;