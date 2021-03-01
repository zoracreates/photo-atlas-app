import axios from 'axios';

function createUrl(options = {}) {
    let url, item;
    url = `https://api.flickr.com/services/rest/?api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.photos.search&format=json&nojsoncallback=true}`

    for (item in options) {
        if (options.hasOwnProperty(item)) {
            url += "&" + item + "=" + options[item];
        }
    }

    return url;
}

async function getFlickrPhotos(options = {}) {
    
    let url = createUrl(options)
    let response;

    try {
       response = await axios.get(url)
       return response.data
       
    } catch(err) {
        console.log(err); 
    }

};


export default getFlickrPhotos;