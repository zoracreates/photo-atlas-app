import resizeImage from '../../utils/resizeimage';

const ContainedImage = (props) => {

  const { src, alt } = props;

  const onImageLoad = ({ target: img }) => {

    //ensure image is not bigger than desired size, while maintaining aspect ratio
    resizeImage(img, props.maxHeight, props.maxWidth);

  }

  return (
    <div className={`image-container`}>
      <img onLoad={onImageLoad} src={src} alt={alt} />
    </div>
  )

}

export default ContainedImage;
