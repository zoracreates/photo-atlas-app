import axios from 'axios';

async function getFlickrPlace(options = {}) {
    
    let url, response;

    if (options.placeId) {
        url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.places.getInfo&format=json&nojsoncallback=1}&place_id=${options.placeId}`
    }
    else if (options.woeId) {
        url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.places.getInfo&format=json&nojsoncallback=1}&woe_id=${options.woeId}`
    }
    else {
        return
    }

        try {
            response = await axios.get(url)
            
         } catch(err) {
             alert(err); 
         }

         if(response.data.place.woe_name) {
            return response.data.place.woe_name
         }

         
     
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
