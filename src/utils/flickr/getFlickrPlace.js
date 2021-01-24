async function getFlickrPlace(options = {}, handleResponse =
    (responseData) => console.log(responseData.place)) {
    
    let url;

    if (options.placeId) {
        url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.places.getInfo&format=json&nojsoncallback=1}&place_id=${options.placeId}`
    }
    else if (options.woeId) {
        url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.places.getInfo&format=json&nojsoncallback=1}&woe_id=${options.woeId}`
    }
    else {
        return
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

export default getFlickrPlace;

/*
USAGE

This receives two parameters options and handleResponse.

The first parameter, options, is an object that contains the parameters that need to be passed to the Flickr REST request. 
If a placeId is provided in options, then the request uses placeId, otherwise it uses the woe id or returns

The second parameter, handleResponse, is a callback indicating what to do once the request is received. 
As a default handleResponse logs the received results into the browser console, but a different function may be passed. 
*/
