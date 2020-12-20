  //function source https://wisej.com/support/question/resize-image-before-uploading-with-upload-control
  let resizeImage = function (img, maxHeight = 100, maxWidth = 100) {
  
    //get the original source photo width and height
    const srcWidth = img.width;
    const srcHeight = img.height;
  
    //define our target size letiables
    let newWidth = srcWidth;
    let newHeight = srcHeight;
  
    //only need to resize if source dimensions exceed our maximum dimensions
    if ((srcWidth > maxWidth) || (srcHeight > maxHeight)) {
      //Conserve aspect ratio of the original 
      let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  
      //set new dimensions with aspect ratio preserved
      newWidth = srcWidth * ratio;
      newHeight = srcHeight * ratio;
    }
  
    img.width = newWidth;
    img.height = newHeight;
  }

  export default resizeImage;