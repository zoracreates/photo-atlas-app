import ContainedImage from './ContainedImage'


  

const PhotoSlider = (props) => {

    const {imageList} = props;

    return (
        <div className={`photo-slider`}>

            {imageList.map((image, id) => {

                const { src, alt } = image;

                return <ContainedImage key={id} src={src} alt={alt} maxHeight={400} maxWidth={700} />

            })}

        </div>
    )
}

export default PhotoSlider;
