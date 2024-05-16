import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import PrimaryButton from "../atoms/PrimaryButton"

const CardProductoRecomendado = ({ img, title, textInfo, price }) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "15px",
        height: { xs: 350, sm: 210 },
        width: { xs: "100%", sm: 600},
        flexDirection: { xs: "column", sm: "row" }, // Vertical en móvil, horizontal en otros tamaños
      }}
    >
      <CardMedia
        sx={{ width: { xs: "100%", sm: "35%" }, height: { xs: 150, sm: "100%" }, objectFit: 'cover' }}
        title="product"
        image={img}
      />
      <CardContent sx={{ width: { xs: "100%", sm: "65%" }, height: { xs: "auto", sm: "100%" }, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>

        <Box sx={{ width: { xs: "90%", sm: "90%" }, height: { xs: "auto", sm: "35%" }}}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"#A62639"}
            fontWeight={"600"}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ width: { xs: "90%", sm: "90%" }, height: { xs: "auto", sm: "20%" }}}
        >
          <Typography variant="body2" color="#56494E" fontWeight={"500"}>
            {textInfo}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          sx={{ width: { xs: "90%", sm: "90%" }, height: { xs: "auto", sm: "10%" }}}
        >
          <Typography
            variant="body1"
            color={"#A62639"}
            fontWeight={"600"}
          >
            {price}
          </Typography>
        </Box>

        <Box 
          display={"flex"} 
          justifyContent={"flex-end"}
          sx={{ width: { xs: "90%", sm: "90%" }, height: { xs: "auto", sm: "20%"}}}
        >
          <PrimaryButton text={"COTIZAR"} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardProductoRecomendado;
