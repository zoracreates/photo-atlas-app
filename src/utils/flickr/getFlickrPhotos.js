async function getFlickrPhotos(options = {}, handleResponse =
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

export default getFlickrPhotos;

/*
USAGE

The function getFlickrPhotos receives two parameters options and handleResponse.

The first parameter, options, is an object that contains the parameters that need to be passed to the Flickr REST request. 

The second parameter, handleResponse, is a callback indicating what to do once the request is received. 
As a default handleResponse logs the received results into the browser console, but a different function may be passed. 

As an example, the following call to getFlickrPhotos requests a list of photos within Boston  (defined by lat and lon), 
along with their description and coordinates (defined in extas), sorted by how interesting they are
and logs the data from the first photo in that list:

        let userInput = { 
            "lat": "42.3601",
            "lon": "-71.0589"
            "extras" : "geo, description",
            "sort" : "interestingness-desc"
        } 

        getFlickrPhotos(
            userInput, 
            (data)=> {console.log(data.photos.photo[1])})
        );
*/