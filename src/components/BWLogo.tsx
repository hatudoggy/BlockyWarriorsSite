import { Box } from "@mui/material";
import BWSVGLogo from "../assets/svgs/Green Logo.svg"



export default function BWLogo() {

  return(
    <Box
      component='img'
      src={BWSVGLogo}
      sx={{
        width: 56
      }}
    ></Box>
  )
}