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
import BottomNavigationBar from "../navigationBar/BottomNavbar";
// Disease solutions mapping
const disease_solutions = {
  'Celulitis bacteriana': {
      "medicamento": "Antibiotics like Cephalexin or Clindamycin",
      "recurso": "Apply warm compresses and elevate the affected area."
  },
  'Impétigo bacteriano': {
      "medicamento": "Topical antibiotics like Mupirocin",
      "recurso": "Keep the area clean and avoid scratching."
  },
  'Pie de atleta fúngico': {
      "medicamento": "Antifungal creams like Clotrimazole or Terbinafine",
      "recurso": "Keep feet dry and wear breathable shoes."
  },
  'Hongos en las uñas fúngicos': {
      "medicamento": "Oral antifungal drugs like Terbinafine",
      "recurso": "Use vinegar or tea tree oil soaks."
  },
  'Tiña fúngica': {
      "medicamento": "Antifungal creams like Miconazole",
      "recurso": "Avoid sharing personal items and keep skin dry."
  },
  'Larva migrans cutánea parasitaria': {
      "medicamento": "Albendazole or Ivermectin",
      "recurso": "Avoid walking barefoot on contaminated soil."
  },
  'Varicela viral': {
      "medicamento": "Antiviral drugs like Acyclovir (for severe cases)",
      "recurso": "Apply calamine lotion and avoid scratching."
  },
  'Culebrilla viral': {
      "medicamento": "Antiviral medications like Valacyclovir",
      "recurso": "Apply cool compresses and take pain relievers."
  },
  'Eczema': {
      "medicamento": "Tome medicamentos como antihistamínicos y corticosteroides para aliviar la picazón.",
      "recurso": "Aplique las cremas de hidrocortisona indicadas en la etiqueta, generalmente de una a cuatro veces al día durante un máximo de siete días."
  },
  'Melanoma': {
      "medicamento": "Medicamentos como Aldesleukin, Amtagvi (Lifileucel) y Atezolizumab (Tecentriq).",
      "recurso": "Evite la exposición prolongada al sol, use protector solar todo el tiempo y use ropa protectora que cubra sus brazos, piernas y cara cuando salga al exterior."
  },
  'Dermatitis atópica': {
      "medicamento": "Estos medicamentos, como el tacrolimus (Protopic) y el pimecrolimus (Elidel), se utilizan para terapia a largo plazo o de mantenimiento.",
      "recurso": "La aplicación regular de emolientes (humectantes) y baños o duchas cortos y tibios pueden ayudar a calmar la piel, pero evite los baños muy calientes o prolongados, ya que pueden resecar la piel."
  },
  'carcinoma de células basales': {
      "medicamento": "Prefiero un medicamento como Aldara (imiquimod), Cemiplimab-rwlc, Ebudex (fluorouracilo tópico)",
      "recurso": "El aceite de mirra es uno de los remedios naturales más efectivos. Además de tratar el carcinoma basocelular, su uso cutáneo es muy seguro."
  },
  'Nevos melanocíticos': {
      "medicamento": "Prefiero un medicamento como la crema de imiquimod (Aldara), la crema de 5-fluorouracilo (5-FU)",
      "recurso": "Los remedios caseros, como el jugo de limón y el aloe vera, pueden hacer que los lunares se desvanezcan, reduzcan su tamaño o eliminen por completo."
  },
  'Lesiones benignas similares a la queratosis': {
      "medicamento": "medicamentos tópicos como 5-fluorouracilo, imiquimod, diclofenaco, tazaroteno o urea, y procedimientos como crioterapia, legrado, electrocauterización o terapia láser.",
      "recurso": "Concéntrese en el cuidado suave de la piel, que incluya baños tibios, exfoliación suave, hidratación y evitar ropa ajustada y jabones agresivos."
  },
  'Imágenes de psoriasis, liquen plano y enfermedades relacionadas': {
      "medicamento": "corticosteroides tópicos, medicamentos orales como retinoides o inmunosupresores y fototerapia.",
      "recurso": "Avena: la mejor manera de utilizar avena para tratar la erupción cutánea causada por liquen plano es molerla hasta convertirla en un polvo fino (avena coloidal) en una licuadora o procesador de alimentos."
  },
  'Queratosis seborreicas y otros tumores benignos': {
      "medicamento": "tratamientos tópicos como crema de tazaroteno o solución de peróxido de hidrógeno.",
      "recurso": "No existen remedios caseros comprobados para la eliminación completa ni para el tratamiento de otros tumores benignos, por lo que es mejor consultar a un médico profesional."
  },
  'Warts Molluscum and other Viral Infections': {
      "medicamento": "Considere tratamientos tópicos como ácido salicílico, cantaridina o tretinoína.",
      "recurso": "Considere tomar aceite de árbol de té, vinagre de sidra de manzana y baños de avena coloidal."
  }
};


// Disease Card Component
function Disease() {
  const location = useLocation();
  const data = location.state || {};
  const navigate = useNavigate();
  console.log("data", data);

  // Fetch correct medicine & remedy based on disease name
  const diseaseName = data?.prediction || "Unknown Disease";
  const solution = disease_solutions[diseaseName] || {
    medicamento: "No specific medicamento found.",
    recurso: "No recurso available."
  };


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
                      <AppBar position="static">
                        <Toolbar className="doctorWrp">
                          <Typography variant="h6">Enfermedad predicha...</Typography>
                        </Toolbar>
                      </AppBar>
                      <CardContent>
                        {/* Disease Name */}
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {data.prediction}
                        </Typography>

                        {/* Medicine */}
                      <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 2 }}>
                      medicamento:
                      </Typography>
                      <Typography variant="body2">
                        {data?.medicamento || "No specific medicamento found."}
                      </Typography>

                      {/* Remedy */}
                      <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 2 }}>
                      Remedio Casero:
                      </Typography>
                      <Typography variant="body2">
                        {data?.recurso || "No recurso available."}
                      </Typography>


                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* <BottomNavigationBar/>   */}
          </Box>
        </Container>
      </Box>

    </>
  )
}



export default Disease;
