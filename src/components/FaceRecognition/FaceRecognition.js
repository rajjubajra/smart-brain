import React from 'react';
import './FaceRecognition.css';




const FaceRecognition = ({imageUrl, box}) => {

  if(imageUrl){
  return(
      <div className="display-face">
        <div>
        <img id="inputImage" src={imageUrl} alt='Face' />
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
      </div>
     );
   }else{
     return 'Please enter image URL';
   }
}


export default FaceRecognition;
