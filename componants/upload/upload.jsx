// This code is original and working condition completely, Please do not delete this 
// import { Box, Button, IconButton, Link, Typography } from "@mui/material";
// import React from "react";
// import { styled } from "@mui/material/styles";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CancelIcon from "@mui/icons-material/Cancel";
// import DeleteIcon from "@mui/icons-material/Delete";
// import "./upload.css";

// const PerformanceGauge = () => {
//   // Use a third-party library like Recharts or Nivo to create the gauge
//   return <div>Performance Gauge</div>;
// };

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// function Upload() {
//   return (
//     <>
//       <Box className="uploadDetails">
//         <Typography variant="h5">Upload</Typography>
//       </Box>
//       <Box className="uploadFiles">
//         <Button
//           className="uploadBtn"
//           component="label"
//           role={undefined}
//           variant="contained"
//           tabIndex={-1}
//           startIcon={<CloudUploadIcon />}
//         >
//           Drag & drop files or <Link>Browse</Link>
//           <VisuallyHiddenInput
//             type="file"
//             onChange={(event) => console.log(event.target.files)}
//             multiple
//           />
//         </Button>
//       </Box>

//       <Box className="fileData">
//         <Box className="uploadFileData">
//           <Typography>Uploading - 3/3 files</Typography>
//         </Box>

//         <Box className="fileListMenu">
//           <Typography>your-file-here.PDF</Typography>
//           <CancelIcon />
//         </Box>

//         <Box className="uploadFileData ">
//           <Typography>Uploaded</Typography>
//         </Box>

//         <Box className="documentMenu">
//           <Typography>document-name.PDF</Typography>
//           <IconButton size="small">
//             <DeleteIcon />
//           </IconButton>
//         </Box>

//         <Box className="documentMenu">
//           <Typography>image-name-goes-here.png</Typography>
//           <IconButton size="small">
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//         <Box className="bottomButton">
//           <Button type="button" variant="contained" size="large" color="info">
//             Upload Files
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default Upload;



// This is duplicate code for testing purpose
import { useRef, useState } from "react";
import { Box, Button, Container, IconButton, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import "./upload.css";
import { useNavigate } from "react-router-dom";
import Webcam from 'react-webcam';
import { IoArrowBackOutline } from "react-icons/io5";

import CameraAltIcon from "@mui/icons-material/CameraAlt";




const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Upload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  console.log("image", image);

  const [file, setFile] = useState(null);
  const [stream, setStream] = useState(null); // For storing the camera stream
  console.log("stream", stream);

  const webcamRef = useRef(null);  // Ref for video element
  const canvasRef = useState(null);

  console.log("File", selectedFile);

  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleUpload = async () => {
    // if (!selectedFile && !image) {
    //   alert("Please select an image first!");
    //   return;
    // }
  
    let response;
    try {
      if (image) {
        console.log("called");
        
        response = await fetch("http://127.0.0.1:5000/upload_base64", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }), // Base64 image as JSON
        });
      } else {
        const formData = new FormData();
        formData.append("image", selectedFile);
  
        response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });
      }
  
      const data = await response.json();
      console.log("data====>",data);
   
      handleResponse(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };
  
  // ✅ **Common Response Handler**
  const handleResponse = (data) => {
    if (data.error) {
      alert(data.error);
    } else {
      navigate("/disease", { state: data }); // Redirect with response data
    }
  };
  

  // Start the camera feed
  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(userStream);
      videoRef.current.srcObject = userStream;
      return videoRef.current.play(); // Ensure the video starts playing
    } catch (err) {
      console.log(err);

      console.error('Error accessing camera: ', err);
    }
  };

  // State to hold captured image

  const captureImage = () => {
    // Capture the image from the webcam and set it to the state
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setStream(null);

    // Backend ne send karva mate request prepare karvu
    // const response = await fetch("http://127.0.0.1:5000/upload_base64", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ image: image }), // Base64 image as JSON
    // });

    // const data = await response.json();
    // console.log("Response:", data);

  };

  // Stop the camera feed
  const stopCamera = () => {
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setStream(null);
  };

  return (
    <>
    <Box className="splashScreen uploadScreen">
        <Container className="root" maxWidth="sm">
          <Box className="splashData">
          <Box>
        {/* Upload Details */}

        <Box className="splashHeader backPage">
              <Button variant="contained" size="medium" className="btn" onClick={()=>{navigate(-1)}}>
               
                <IoArrowBackOutline size="small" />
              </Button>
            </Box>
        <Box className="uploadDetails">
          <Typography variant="h5">Upload Image</Typography>
        </Box>

        {/* Upload Files Section */}
        <Box className="uploadFiles">
          <Button
            className="uploadBtn"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Drag & drop files or <Link>Browse</Link>
            {/* Regular file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the input 
            />
          </Button>
        </Box>

        <Box className="startCamera">
            {/* Camera Capture Section */}
            <Button
            className="uploadBtn"
            variant="contained"
            color="primary"
            onClick={startCamera}
          >
            Start Camera
          </Button>
          
        </Box>

        <Box className="imageDisplay">
        {stream && (
            <Box>
              <Box className="videoPlay">
              <Webcam
                audio={false}  // Disable audio
                ref={webcamRef}
                screenshotFormat="image/jpeg"  // Set the screenshot format
                width="100%"  // Set the width of the webcam feed
              />
              </Box>
            
              <Box className="captureInfo">
              {image && (
                <div>
                  <h3>Captured Image:</h3>
                  <img src={image} alt="Captured" />
                </div>
              )}
              <Button variant="contained" color="secondary" onClick={captureImage}>
                Capture Photo
              </Button>
              <Button variant="contained" color="secondary" onClick={stopCamera}>
                Stop Camera
              </Button>
              </Box>
            </Box>
          )}
        </Box>

        {/* Display uploaded file or image */}
        <Box className="fileData">
          <Box className="uploadFileData">
            <Typography>Uploading: {file ? file.name : "No file selected"}</Typography>
          </Box>

          {image && (
            <Box className="fileListMenu">
              <img src={image} alt="Uploaded preview" style={{ width: "200px", marginBottom: "10px" }} />
              <CancelIcon onClick={() => setImage(null)} style={{ cursor: "pointer" }} />
            </Box>
          )}

          {/* Display uploaded file names */}
          
          <Box className="uploadFileData ">
            <Typography>Uploaded</Typography>
          </Box>

          {/* <Box className="documentMenu">
            <Typography>{file ? file.name : "No file uploaded"}</Typography>
            <IconButton size="small" onClick={() => setFile(null)}>
              <DeleteIcon />
            </IconButton>
          </Box> */}
        </Box>

        {/* Bottom Button for uploading */}
        <Box className="bottomButton">
          <Button
            type="button"
            variant="contained"
            size="large"
            color="info"
            onClick={handleUpload}
          >
            Upload Files
          </Button>
        </Box>
      </Box>
            </Box>
            </Container>
          </Box>
     
    </>
  );
}

export default Upload;
