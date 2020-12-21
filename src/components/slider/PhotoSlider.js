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

const PhotoSlider = (props) => {

  const { imageList } = props;

  const lightboxOptions = {
    buttons: {
      showDownloadButton: false,
      showAutoplayButton: false
    }
  }

  const windowWidth = window.innerWidth;
  const maxImageWidth = (windowWidth > 600) ? (windowWidth / 2.5) : (windowWidth * .8);

  return (

    <SimpleReactLightbox>

      <div className={`photo-slider`}>

        <SRLWrapper options={lightboxOptions}>
          
          {imageList.map((image, id) => {

            const { src, alt } = image;

            return (
              <a key={id} href={src}>
                <ContainedImage src={src} alt={alt} maxHeight={600} maxWidth={maxImageWidth} />
              </a>
            )

          })}

        </SRLWrapper>

      </div>

    </SimpleReactLightbox>

  )
}

export default PhotoSlider;
