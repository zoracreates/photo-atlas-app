import Location from '../location/Location';

// let locationList = [
//     {
//         "imageUrl": "https://picsum.photos/200/300",
//         "saves": 0,
//         "distance": 2.1,
//         "title": "image title"
//     },
//     {
//         "imageUrl": "https://picsum.photos/200/300",
//         "saves": 0,
//         "distance": 2.1,
//         "title": "image title"
//     },
//     {
//         "imageUrl": "https://picsum.photos/200/300",
//         "saves": 0,
//         "distance": 2.1,
//         "title": "image title"
//     },
//     {
//         "imageUrl": "https://picsum.photos/200/300",
//         "saves": 0,
//         "distance": 2.1,
//         "title": "image title"
//     }
// ]; 

const imageList = [
    {
      src: "https://picsum.photos/700/800",
      alt: "placeholder 1",
      author: "Zoraida Cabrera-Mieles",
      creditUrl: "https://www.zoracabrera.com/"
    },
    {
      src: "https://picsum.photos/1000/300",
      alt: "placeholder 2"
    },
    {
      src: "https://picsum.photos/200/300",
      alt: "placeholder 3"
    },
    {
      src: "https://picsum.photos/2000/700",
      alt: "placeholder 4"
    }
  ];

function Explore() {
    return (
        <>
      
        <Location imageList={imageList}/>



            {/*
        
           Route to Home View and Search View
        
        */}

        </>
    )
}

export default Explore;