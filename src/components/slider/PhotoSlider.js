import React from 'react';
import PropTypes from 'prop-types';

import ContainedImage from './ContainedImage';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";



/* 
props.imageList receives an array of objects like this one:

const imageList = [
  {
    src: "https://picsum.photos/700/800",
    alt: "placeholder 1"
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
*/


const windowWidth = window.innerWidth;
const breakPoint = 600;
const maxImageWidth = (windowWidth > breakPoint) ? (windowWidth / 2) : windowWidth;

const PhotoSlider = (props) => {
  const { imageList } = props;
  const imagesCount = imageList.length;

  const lightboxOptions = {
    buttons: {
      showDownloadButton: false,
      showAutoplayButton: false
    }
  }

  return (
    <SimpleReactLightbox>
      <div className={`photo-slider`}>

        <SRLWrapper options={lightboxOptions}>

          {imageList.map((image, id) => {

            const { src, alt, author, creditUrl } = image;

            return (
              <div key={id} className={`image-with-credit`}>
                <a href={src}>
                  <ContainedImage src={src} alt={alt} maxHeight={600} maxWidth={maxImageWidth} />
                </a>
                {author && <span className={`credit`}><a href={creditUrl}>{author}</a></span>}
              </div>
            )

          })}

        </SRLWrapper>

      </div>

      <p className={`caption`}>Total images: {imagesCount}</p>

    </SimpleReactLightbox>

  )

}

PhotoSlider.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default PhotoSlider;
