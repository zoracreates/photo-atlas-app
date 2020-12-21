import React from 'react';
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

class PhotoSlider extends React.Component {

  state = {
    scrollToEl: 2,
    fwdToggle: 'active',
    bckToggle: 'disabled'
  }

  render() {

    const { imageList } = this.props;
    const imagesCount = imageList.length;

    const lightboxOptions = {
      buttons: {
        showDownloadButton: false,
        showAutoplayButton: false
      }
    }

    const windowWidth = window.innerWidth;
    const maxImageWidth = (windowWidth > 600) ? (windowWidth / 2.5) : (windowWidth * .8);



    let handleFwdClick = () => {

      if (this.state.scrollToEl >= 1 && this.state.scrollToEl < imagesCount) {

        let fwdTo = document.querySelector(`.photo-slider > div > a:nth-child(${this.state.scrollToEl})`);

        if (fwdTo) {
          fwdTo.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
        }

        this.setState(
          prevState => { return { scrollToEl: prevState.scrollToEl + 1 } },

          () => {
            console.log(this.state.scrollToEl);
            if (this.state.scrollToEl > 1 && this.state.bckToggle === 'disabled') {
              this.setState({ bckToggle: 'active' })
            }
            if (this.state.scrollToEl >= imagesCount && this.state.scrollToEl) {
              this.setState({ fwdToggle: 'disabled' })
            }
          }
        )

      }

      else {
        this.setState({ fwdToggle: 'disabled' })
      }
    }



    let handleBckClick = () => {
      if (this.state.scrollToEl > 1) {
        this.setState(prevState => ({ scrollToEl: prevState.scrollToEl - 1 }),
          () => {
            let backTo = document.querySelector(`.photo-slider > div > a:nth-child(${this.state.scrollToEl})`)

            if (backTo) {
              backTo.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }

            if (this.state.scrollToEl >= 1 && this.state.scrollToEl < imagesCount && this.state.fwdToggle === 'disabled') {
              this.setState({ fwdToggle: 'active' })
            }

            if (this.state.scrollToEl === 1) {
              this.setState(prevState => ({ scrollToEl: prevState.scrollToEl + 1 }),
                () => {
                  this.setState({ bckToggle: 'disabled' })
                });
            }


            if (this.state.scrollToEl <= 2) {
              this.setState({ bckToggle: 'disabled' })
            }

          });
      }
      else {
        this.setState({ bckToggle: 'disabled' })
      }
    }


    return (
      <SimpleReactLightbox>
        <div className={`photo-slider`}>
          <button className={`${this.state.fwdToggle} fwd`} onClick={handleFwdClick}>
            Next
          </button>

          <button className={`${this.state.bckToggle} bck`} onClick={handleBckClick}>
            Previous
          </button>
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

        <p className={`caption`}>Total images: {imagesCount}</p>

      </SimpleReactLightbox>

    )
  }
}

export default PhotoSlider;
