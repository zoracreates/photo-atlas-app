import { AlgoliaProvider } from 'leaflet-geosearch';

async function getGeoSuggestions(input) {
    const provider = new AlgoliaProvider();

    try {
        const results = await provider.search({query: input});
        if (results) {
            return results
        }
        else {
            return []
        }
    }
    catch (err) {
        console.log(err);
    }
}

export default getGeoSuggestions;

//https://smeijer.github.io/leaflet-geosearch/providers/algolia
//https://smeijer.github.io/leaflet-geosearch/usage