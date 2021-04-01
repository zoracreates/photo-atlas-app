import React from 'react';
import PropTypes from 'prop-types';

import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";


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
                 <div className={`image-container`}>
                 <img  src={src} alt={alt ? alt : ''}   />
                 </div>
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
