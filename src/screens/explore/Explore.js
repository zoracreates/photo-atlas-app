import SearchResults from './SearchResults';

let locationList = [
    {
        "imageUrl": "https://picsum.photos/200/300",
        "saves": 0,
        "distance": 2.1,
        "title": "image title"
    },
    {
        "imageUrl": "https://picsum.photos/200/300",
        "saves": 0,
        "distance": 2.1,
        "title": "image title"
    },
    {
        "imageUrl": "https://picsum.photos/200/300",
        "saves": 0,
        "distance": 2.1,
        "title": "image title"
    },
    {
        "imageUrl": "https://picsum.photos/200/300",
        "saves": 0,
        "distance": 2.1,
        "title": "image title"
    }
]; 

function Explore() {
    return (
        <>
            <SearchResults locationList={locationList} />




            {/*
        
           Route to Home View and Search View
        
        */}

        </>
    )
}

export default Explore;