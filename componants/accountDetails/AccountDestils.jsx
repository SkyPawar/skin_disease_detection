import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { IoArrowBackOutline } from "react-icons/io5";
import BottomNavigationBar from '../navigationBar/BottomNavbar';
import { useNavigate } from 'react-router-dom';
import "./accountDetails.css"

const feedbacks = [
  {
    name: "Dr. Mehta",
    feedback: "Esta aplicación es muy útil en el ámbito médico. Ofrece una solución perfecta para enfermedades de la piel.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Dr. Patel",
    feedback: "Una aplicación muy fácil de usar. Perfecta para el seguimiento de las enfermedades cutáneas de los pacientes.",
    rating: "⭐⭐⭐⭐"
  },
  {
    name: "Ravi Sharma",
    feedback: "Me gusta mucho la función de predicción de enfermedades de esta aplicación. Es útil para estudiantes de medicina.",
    rating: "⭐⭐⭐⭐"
  }
];

const AccountDetails = () => {
  const navigate = useNavigate();

  return (
    <Box className="splashScreen uploadScreen">
       <Container className="root" maxWidth="lg"> 
        <Box className="splashData">

          {/* Back Button */}
          <Box className="splashHeader backPage">
            <Button variant="contained" size="medium" className="btn" onClick={() => navigate(-1)}>
              <IoArrowBackOutline size="small" />
            </Button>
          </Box>

          {/* Stylish Heading */}
          <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" sx={{ marginBottom: 3 }}>
          Comentarios del usuario
          </Typography>

          {/* Feedback Grid */}

          <Grid container spacing={2} justifyContent="center" maxWidth="lg">
            {feedbacks.map((user, index) => (
              <Grid item xs={12} sm={12} md={4} key={index} className="accountsBox">
                <Box className="userDetail">
                <Card className="userInfo">
                  <CardContent className="userName">
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {user.name}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                      {user.feedback}
                    </Typography>
                    <Typography variant="body2" color="secondary" sx={{ marginTop: 1 }}>
                      {user.rating}
                    </Typography>
                  </CardContent>
                </Card>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* <BottomNavigationBar /> */}
        </Box>
      </Container>
    </Box>
  );
};

export default AccountDetails;
