import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PhotoSlider from './components/slider/PhotoSlider';



const imageList = [
  {
    src: "https://picsum.photos/200/200",
    alt: "placeholder 1"
  },
  {
    src: "https://picsum.photos/1000/200",
    alt: "placeholder 2"
  },
  {
    src: "https://picsum.photos/200/200",
    alt: "placeholder 3"
  },
  {
    src:  "https://picsum.photos/2000/4000",
    alt: "placeholder 4"
  },
  {
    src:  "https://picsum.photos/2000/2000",
    alt: "placeholder 4"
  },
  {
    src:  "https://picsum.photos/200/200",
    alt: "placeholder 4"
  },
  {
    src:  "https://picsum.photos/200/200",
    alt: "placeholder 4"
  }
];


ReactDOM.render(
  <React.StrictMode>
    <App>
      <PhotoSlider imageList={imageList} />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);