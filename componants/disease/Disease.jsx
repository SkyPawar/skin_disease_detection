import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  AppBar,
  Toolbar,
  CardMedia,
  Container,
  Button,
} from "@mui/material";
import "./disease.css";
import { IoArrowBackOutline } from "react-icons/io5";
import img from "../../src/assets/images/brain-stroke.png";
import { useLocation, useNavigate } from "react-router-dom";
const DiseaseData = [
  {
    disease: "Diabetes",
    percentage: 70,
  },
  {
    disease: "Heart Disease",
    percentage: 85,
  },
  {
    disease: "Hypertension",
    percentage: 50,
  },
  {
    disease: "Cancer",
    percentage: 60,
  },
  {
    disease: "Asthma",
    percentage: 40,
  },
  {
    disease: "Obesity",
    percentage: 75,
  },
];

// Disease Card Component
function Disease() {
  const location = useLocation();
  const data = location.state || {};
  const navigate = useNavigate();
  console.log("data", data);

  return (
    <>

      <Box className="splashScreen uploadScreen">
        <Container className="root" maxWidth="sm">
          <Box className="splashData">
            <Box className="splashHeader backPage">
              <Button variant="contained" size="medium" className="btn" onClick={() => { navigate(-1)} }>

                <IoArrowBackOutline size="small" />
              </Button>
            </Box>
            <Box className="headerDetails capatureDetails">
              <AppBar position="static">
                <Toolbar className="doctorWrp">
                  <Typography variant="h6">Predicted Disease...</Typography>
                </Toolbar>
              </AppBar>
              <Box className="predicetedInfo">
                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                  <Grid item xs={12} lg={12} sm={6} md={6} key={data.prediction} className="capaturedetails">
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
                        image={data.image_url}
                        // alt={"brain-stroke"}
                        alt="Predicted Disease"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={12} sm={6} md={6} key={data.prediction}>
                    <Card
                      sx={{
                        padding: 2,
                        borderRadius: 1,
                        boxShadow: 3,
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <CardContent>
                        {/* Disease Name */}
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {data.prediction}
                        </Typography>


                        <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
                          {/* Red Circle - Disease Probability */}
                          <Grid item>
                            <Box sx={{ position: "relative", display: "inline-flex", width: 80, height: 80 }}>
                              <CircularProgress
                                variant="determinate"
                                value={101}
                                size={80}
                                thickness={5}
                                color="error" // Red Circle for Disease Probability
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <Typography variant="h6" color="text.secondary">
                                  {data.red}%
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                              Prediction
                              probability
                            </Typography>
                          </Grid>

                          {/* Green Circle - Survival Probability */}
                          <Grid item>
                            <Box sx={{ position: "relative", display: "inline-flex" }}>
                              <CircularProgress
                                variant="determinate"
                                value={data.green}
                                size={80}
                                thickness={5}
                                color="success" // Green Circle for Survival Probability
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  top: "30%",  // Adjusted to position text below the circle
                                }}
                              >
                                <Typography variant="h6" color="text.secondary">
                                  {data.green}%
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                              Survival
                              Probability
                            </Typography>
                          </Grid>
                        </Grid>


                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

    </>
  )
}



export default Disease;
