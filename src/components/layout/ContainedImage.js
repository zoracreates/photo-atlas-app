import React from 'react';
import resizeImage from '../../utils/resizeimage';

class ContainedImage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        imgAspectRatio: 1

      };

      this.onImageLoad = this.onImageLoad.bind(this);
    }



    // function source https://stackoverflow.com/questions/39092859/get-dimensions-of-image-with-react
    onImageLoad({ target: img }) {

      resizeImage(img, this.props.maxHeight, this.props.maxWidth);

      let width = img.width;
      let height =  img.height;
      let ratio = width / height;

      this.setState(
        {
          imgAspectRatio: ratio
        }
      );
    
    }

    render() {

      const { src, alt } = this.props;
      const { imgAspectRatio } = this.state;

      return (
        <div className={`image-container`} style={{flex: `${imgAspectRatio}` }}>
          <img onLoad={this.onImageLoad} src={src} alt={alt} />
        </div>
      );
    }

  }

  export default ContainedImage;
