import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const theme = createTheme({
  shape: {
    borderRadius: 30, // Adjust this value to make buttons more or less rounded
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    textTransform: "capitalize",
  },
  palette: {
    primary: {
      main: "#000", // Set primary color to black
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#000",
          color: "#fff", // White text for better contrast on black background
          "&:hover": {
            backgroundColor: "#333", // Darker black on hover
          },
        },
        outlined: {
          borderColor: "#000",
          color: "#000",
          "&:hover": {
            backgroundColor: "#f5f5f5", // Light background on hover
          },
        },
        text: {
          color: "#000",
          "&:hover": {
            backgroundColor: "#f5f5f5", // Light background on hover
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
