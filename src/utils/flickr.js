async function requestFlickrPhotos(options = {}, handleResponse =
    (responseData) => console.log(responseData)) {
    let url, item;
    url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.photos.search&format=json&nojsoncallback=1}`

    for (item in options) {
        if (options.hasOwnProperty(item)) {
            url += "&" + item + "=" + options[item];
        }
    }

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

export default requestFlickrPhotos;
