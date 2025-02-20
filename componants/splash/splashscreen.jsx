import { Box, Button, Card, Container, Typography } from "@mui/material";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import SouthEastRoundedIcon from "@mui/icons-material/SouthEastRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { useState } from "react";
import "./splashscreen.css";
import { useNavigate } from "react-router-dom";

function Splashscreen() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const handleSlide = () => {
    setCompleted(true);
    setTimeout(() => {
      navigate("/upload")

    }, 1000);
  };
  return (
    <>
      <Box className="splashScreen">
        <Container className="root" maxWidth="sm">
          <Box className="splashData">
            <Box className="splashHeader">
              <Button variant="contained" size="medium" className="btn">
                <VaccinesRoundedIcon size="small" />
              </Button>
              <Button variant="contained" size="medium" className="btn">
                Helth Insurans
              </Button>
            </Box>
            <Box className="splashBody">
              <Card className="splashCard">
                <Typography variant="h2" component="div">
                  400k
                </Typography>
                <Box className="splashText">
                  <Typography variant="h4">Patients</Typography>
                  <SouthEastRoundedIcon size="small" />
                </Box>
              </Card>
            </Box>
            <Box className="splashFooter">
              <Box className="slide">
                <Box className="sliderContainer" onClick={handleSlide}>
                  <Typography className="sliderText">Get Start</Typography>
                  <Box className={`slider ${completed ? "complete" : ""}`}>
                    {" "}
                    <KeyboardDoubleArrowRightRoundedIcon />
                  </Box>
                </Box>
                {/* {completed && (
                    <Typography variant="h6" style={{ marginTop: "20px" }}>
                      Get Started
                    </Typography>
                  )} */}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Splashscreen;
