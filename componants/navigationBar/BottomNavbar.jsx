import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Grid } from "@mui/material";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MedicationLiquidTwoToneIcon from '@mui/icons-material/MedicationLiquidTwoTone';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNavigationBar() {
  const [value, setValue] = React.useState("Home");

  let { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "Home") {
      navigate("/");
    } else if (newValue === "Upload") {
      navigate("/upload");
    } else if (newValue === "Medication") {
      navigate("/disease"); 
    } else if (newValue === "Account") {
      navigate("/profile");
    }
  };

  return (
    <Box>
      <Grid container>
        <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange} 
            sx={{ backgroundColor: "black" }}
          >
            <BottomNavigationAction
              label="Home"
              value="Home"
              icon={<HomeTwoToneIcon sx={{ color: "white" }} />}
              sx={{
                color: "white",
                "&.Mui-selected": { color: "white" },
              }}
            />
            <BottomNavigationAction
              label="Upload"
              value="Upload"
              icon={<UploadFileTwoToneIcon sx={{ color: "white" }} />}
              sx={{
                color: "white",
                "&.Mui-selected": { color: "white" },
              }}
            />
            <BottomNavigationAction
              label="Medication"
              value="Medication"
              icon={<MedicationLiquidTwoToneIcon sx={{ color: "white" }} />}
              sx={{
                color: "white",
                "&.Mui-selected": { color: "white" },
              }}
            />
            <BottomNavigationAction
              label="Account"
              value="Account"
              icon={<AccountCircleTwoToneIcon sx={{ color: "white" }} />}
              sx={{
                color: "white",
                "&.Mui-selected": { color: "white" },
              }}
            />
          </BottomNavigation>
        </Box>
      </Grid>
    </Box>
  );
}
