

function createFlickrImageUrl(photoData) {

    let {farm,server,id,secret} = photoData;

    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
}

//reference https://idratherbewriting.com/learnapidoc/docapis_flickr_example.html

export default createFlickrImageUrl;