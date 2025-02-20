import React from "react";
import Grid from "@mui/material/Grid2";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  AppBar,
  Toolbar,
  Container,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Button,
  Badge,
  FormControlLabel,
  Switch,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./details.css";
import { BarChart } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const PerformanceGauge = () => {
  // Use a third-party library like Recharts or Nivo to create the gauge
  return <div>Performance Gauge</div>;
};

const DetailedInformation = () => {
  return (
    <Accordion>
      <AccordionSummary>Detailed Information</AccordionSummary>
      <AccordionDetails>{/* Detailed information content */}</AccordionDetails>
    </Accordion>
  );
};

function Details() {
  return (
    <Box className="headerDetails">
      <AppBar position="static">
        <Toolbar className="doctorWrp">Top Doctor For You</Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 6 }}>
            <Card className="doctorDetail">
              <CardHeader
                className="cardHeader"
                avatar={<Avatar src="/doctor-avatar.jpg" />}
                title="Dr. Mira Herwitz"
              />
              <Typography>Orthopedic Specialist</Typography>
              <CardContent className="statusBtn">
                <Button>
                  Online
                  {/* <Badge
              color="secondary"
              variant="dot"
              invisible={invisible}
            ></Badge> */}
                </Button>
                <Button className="moreBtn">
                  <MoreHorizIcon />
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <Card className="doctorDetail">
              <CardHeader
                className="cardHeader"
                avatar={<Avatar src="/doctor-avatar.jpg" />}
                title="Dr. Mira Herwitz"
              />
              <Typography>Orthopedic Specialist</Typography>
              <CardContent className="statusBtn">
                <Button>
                  Ofline
                  {/* <Badge
              color="secondary"
              variant="dot"
              invisible={invisible}
            ></Badge> */}
                </Button>
                <Button className="moreBtn">
                  <MoreHorizIcon />
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            <Card className="cardHistory">
              <Box className="drDatalist">
                <Box className="cardInfo">
                  <CardHeader
                    className="cardHeader"
                    avatar={<Avatar src="/doctor-avatar.jpg" />}
                  />
                  <Box className="drDetails">
                    <Typography className="drName">Dr. Mira Herwitz</Typography>
                    <Box className="dataList">
                      <Chip
                        label="Orthopedic Specialist"
                        className="Designation"
                      />
                      <Box className="noDoctor">4+</Box>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <CloseIcon />
                </Box>
              </Box>

              <Box className="performanceData">
                <Box className="menuList">
                  <Typography>Performance</Typography>
                  <Box>
                    {/* <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl> */}
                  </Box>
                </Box>
                <Box className="barInfo">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["group A", "group B", "group C"],
                      },
                    ]}
                    series={[
                      { data: [4, 3, 5] },
                      { data: [1, 6, 3] },
                      { data: [2, 5, 6] },
                    ]}
                    width={500}
                    height={300}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <Card className="doctorDetail">
              <CardHeader
                className="cardHeader"
                avatar={<Avatar src="/doctor-avatar.jpg" />}
                title="Dr. Mira Herwitz"
              />
              <Typography>Orthopedic Specialist</Typography>
              <CardContent className="statusBtn">
                <Button>
                  Online
                  {/* <Badge
              color="secondary"
              variant="dot"
              invisible={invisible}
            ></Badge> */}
                </Button>
                <Button className="moreBtn">
                  <MoreHorizIcon />
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <Card className="doctorDetail">
              <CardHeader
                className="cardHeader"
                avatar={<Avatar src="/doctor-avatar.jpg" />}
                title="Dr. Mira Herwitz"
              />
              <Typography>Orthopedic Specialist</Typography>
              <CardContent className="statusBtn">
                <Button>
                  Ofline
                  {/* <Badge
              color="secondary"
              variant="dot"
              invisible={invisible}
            ></Badge> */}
                </Button>
                <Button className="moreBtn">
                  <MoreHorizIcon />
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box className="detailList">
          <Button className="infoBtn">Detailed Information</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Details;
