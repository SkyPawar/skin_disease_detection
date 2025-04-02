import * as React from "react";
import { useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Alert,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import "./upload.css";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { IoArrowBackOutline } from "react-icons/io5";
import { BASE_URL } from "../../config/config";
import BottomNavigationBar from "../navigationBar/BottomNavbar";
import MenuIcon from "@mui/icons-material/Menu";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import ReloadIcon from "@mui/icons-material/Replay";
import ImageIcon from "@mui/icons-material/Image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ToastContainer, toast } from 'react-toastify';

function Upload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [value, setValue] = useState({});
  console.log("value----------------->", value)
  console.log("image", image);

  const [file, setFile] = useState(null);
  const [stream, setStream] = useState(null); // For storing the camera stream
  console.log("stream", stream);

  const webcamRef = useRef(null); // Ref for video element
  const canvasRef = useState(null);

  console.log("File", selectedFile);

  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [facingMode, setFacingMode] = useState("environment");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleUpload = async (file, imgData) => {
    // if (!selectedFile && !image) {
    //   alert("Please select an image first!");
    //   return;
    // }

    let response;
    try {
      if (imgData) {
        console.log("called");

        response = await fetch(`${BASE_URL}/upload_base64`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imgData }), // Base64 image as JSON
        });
      } else {
        const formData = new FormData();
        formData.append("image", file);

        response = await fetch(`${BASE_URL}/upload`, {
          method: "POST",
          body: formData,
        });
      }

      const data = await response.json();
      console.log("data====>", data);
      setValue(data);
      // handleResponse(data);
    } catch (error) {
      toast.error(error)
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  // **Common Response Handler**
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
        video: { facingMode },
      });
      setStream(userStream);
      webcamRef.current.srcObject = userStream;
    } catch (err) {
      console.log(err);

      console.error("Error accessing camera: ", err);
    }
  };

  // Function to switch camera
  const switchCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
    stopCamera();
    startCamera();
  };

  // State to hold captured image

  const captureImage = async () => {
    // Capture the image from the webcam and set it to the state
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setImagePreview(imageSrc);

    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setStream(null);
  };

  // Stop the camera feed
  const stopCamera = () => {
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setStream(null);
  };

  const [messages, setMessages] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  // const [stream, setStream] = useState(null);

  const handleSendMessage = (messageContent, contentType = "text") => {
    if (messageContent) {
      setMessages([
        ...messages,
        { content: messageContent, sender: "user", type: contentType },
      ]);
      if (contentType === "text") {
        setNewMessage("");
      }
      // In a real app, you would send the message to the Disease Detection API here
    }
  };



  const handleOpenImageDialog = () => {
    setIsImageDialogOpen(true);
    setIsCameraOpen(false); // Ensure camera is closed when dialog opens
    setCapturedImage(null);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
    setIsCameraOpen(false);
    setCapturedImage(null);
    // Stop the camera stream when the dialog is closed
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSendMessage(reader.result, "image");
        handleCloseImageDialog();
      };
      reader.readAsDataURL(file);
      handleUpload(file, "")

    }
  };

  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    setIsImageDialogOpen(true); // Keep the dialog open
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(newStream); // Store the stream in state
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraOpen(false); // Ensure camera state is updated on error
      handleCloseImageDialog(); // Close dialog on error
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Check if videoRef.current and stream are valid
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL("image/png");
      handleSendMessage(imageDataUrl, "image");
      handleCloseImageDialog();
      console.log(imageDataUrl)
      handleUpload("", imageDataUrl)
    }
  };

  const handleReset = async () => {
    setMessages([])
    setValue({})
  }
  React.useEffect(() => {
    // Cleanup function to stop the camera stream when the component unmounts or when camera is closed.
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };
  }, [stream]); // Dependency on stream to ensure cleanup when it changes

  // const stopCamera = () => {
  //   if (stream) {
  //     const tracks = stream.getTracks();
  //     tracks.forEach(track => {
  //       track.stop();
  //     });
  //     setStream(null);
  //   }
  //   setIsCameraOpen(false);
  //   if(videoRef.current){
  //     videoRef.current.srcObject = null;
  //   }
  //   setCapturedImage(null);
  // };

  return (
    <>



      {/* ---------------------------------------------------------------------------------------------------- */}
      <ToastContainer />
      {value.error && <Alert onClose={() => { setValue({}), handleReset() }} sx={{ zIndex: "999999", position: "absolute", top: "10%", left: "50%", transform: "translate(-50%, 0%)", minWidth: "80%" }} severity="error">{value.error}</Alert>
      }      <Box
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* App Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#111111" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <IoArrowBackOutline onClick={() => navigate(-1)} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Disease Detection
            </Typography>

          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#111111",
            color: "white",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          {/* Messages Display */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
            <List>
              {messages.map((message, index) => (
                <>
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    sx={{
                      flexDirection:
                        message.sender === "user" ? "row-reverse" : "row",
                    }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        padding: 1,
                        backgroundColor:
                          message.sender === "user" ? "#ECECECFF" : "#919191FF",
                      }}
                    >
                      {message.type === "image" ? (
                        <img
                          src={message.content}
                          alt={`Message ${index}`}
                          style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <ListItemText
                          primary={message.content}
                          sx={{ wordBreak: "break-word" }}
                        />
                      )}
                    </Paper>
                  </ListItem>

                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    sx={{
                      flexDirection:
                        message.sender === "reciver" ? "row-reverse" : "row",
                    }}
                  >
                    {!value.error && <Paper
                      elevation={2}
                      sx={{
                        padding: 1,
                        backgroundColor:
                          message.sender === "reciver" ? "#ECECECFF" : "#919191FF",
                      }}
                    >
                      {message.type === "image" ? (
                        <Box className="headerDetails capatureDetails">
                          <Box className="predicetedInfo">
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                              <Grid item xs={12} lg={12} sm={12} md={12} key={value.prediction} className="capaturedetails">
                                <Box className="protectedImg">
                                  <CardMedia
                                    sx={{
                                      padding: 1,
                                      borderRadius: 1,
                                      boxShadow: 3,
                                      backgroundColor: "#f5f5f5",
                                      objectFit: "contain",
                                      marginLeft: "15px",
                                      margin: "0 auto",
                                      width: "fit-content"
                                    }}
                                    component="img"
                                    height="140"
                                    image={value.image_url}
                                    // alt={"brain-stroke"}
                                    alt="Predicted Disease"
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={12} lg={12} sm={12} md={12} key={value.prediction}>
                                <Card
                                  sx={{
                                    padding: 2,
                                    borderRadius: 1,
                                    boxShadow: 3,
                                    textAlign: "center",
                                    backgroundColor: "#f5f5f5",
                                  }}
                                >
                                  <AppBar position="static">
                                    <Toolbar className="doctorWrp">
                                      <Typography variant="h6">Enfermedad predicha...</Typography>
                                    </Toolbar>
                                  </AppBar>
                                  <CardContent>
                                    {/* Disease Name */}
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                      {value.prediction}
                                    </Typography>

                                    {/* Medicine */}
                                    <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 2 }}>
                                      medicamento:
                                    </Typography>
                                    <Typography variant="body2">
                                      {value?.medicamento || "No specific medicamento found."}
                                    </Typography>

                                    {/* Remedy */}
                                    <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 2 }}>
                                      Remedio Casero:
                                    </Typography>
                                    <Typography variant="body2">
                                      {value?.recurso || "No recurso available."}
                                    </Typography>


                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>

                      ) : (
                        <ListItemText
                          primary={value.prediction}
                          sx={{ wordBreak: "break-word" }}
                        />
                      )}
                    </Paper>}
                  </ListItem>
                </>
              ))}
            </List>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            {messages.length === 0 && (
              <>
                <Typography variant="h5" component="div" sx={{ mb: 4 }}>
                  What can I help with?
                </Typography>
                {/* <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<SummarizeIcon />}
                      sx={{ color: "white", borderColor: "white" }}
                    >
                      Summarize text
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<AnalyticsIcon />}
                      sx={{ color: "white", borderColor: "white" }}
                    >
                      Analyze data
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      sx={{ color: "white", borderColor: "white" }}
                    >
                      Help me write
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{ color: "white", borderColor: "white" }}
                    >
                      More
                    </Button>
                  </Grid>
                </Grid> */}
              </>
            )}
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#222222",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px"
            }}
          >
            {/* <TextField
              fullWidth
              variant="outlined"
              placeholder="Message Disease Detection"
              value={newMessage}
              disabled={messages.length > 0}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent a newline in the TextField
                  handleSendMessage(newMessage);
                }
              }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "white" },
                mr: 1,
              }}
            /> */}
            {messages.length > 0 ?
              <IconButton
                onClick={handleReset}
                edge="end"
                color="primary"
              >
                <ReloadIcon sx={{ color: "white" }} />
              </IconButton>
              :
              <>

                <Typography>Upload Your Image</Typography>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px"
                }}>
                  <IconButton
                    onClick={handleOpenImageDialog}
                    color="primary"
                    sx={{ backgroundColor: "#3d3d3d" }}
                  >
                    <UploadFileIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    onClick={handleSendMessage.bind(null, newMessage)}
                    edge="end"
                    color="primary"
                    sx={{ backgroundColor: "#3d3d3d" }}
                  >
                    <SendIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </>

            }
          </Box>
        </Box>

        {/* Bottom Navigation */}

        {/* Image Dialog */}
        <Dialog open={isImageDialogOpen} onClose={handleCloseImageDialog}>
          <DialogTitle>Upload or Capture Image</DialogTitle>
          <DialogContent>
            {!isCameraOpen ? (
              <>
                <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<ImageIcon sx={{ color: "white" }} />}

                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleOpenCamera}
                    startIcon={<CameraAltIcon sx={{ color: "white" }} />}
                  >
                    Capture Image
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <video
                  ref={videoRef}
                  width="100%"
                  autoPlay
                  muted
                  style={{ maxHeight: "300px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button variant="contained" onClick={handleCaptureImage}>
                    Capture
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={stopCamera}
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImageDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Upload;


