import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null); // Reference for the webcam
  const [image, setImage] = useState(null); // State to hold captured image

  const captureImage = () => {
    // Capture the image from the webcam and set it to the state
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}  // Disable audio
        ref={webcamRef}
        screenshotFormat="image/jpeg"  // Set the screenshot format
        width="100%"  // Set the width of the webcam feed
      />
      <button onClick={captureImage}>Capture Image</button>
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
