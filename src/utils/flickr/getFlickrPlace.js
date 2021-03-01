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
            if (response.data) {
                if(response.data.place.woe_name) {
                    return response.data.place.woe_name
                 }
            }
         } catch(err) {
             alert(err); 
         }
     
};

export default getFlickrPlace;
