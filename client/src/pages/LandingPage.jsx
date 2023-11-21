import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import Logo from "../assests/logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    // Navigate to the home page or the desired route
    navigate("/home"); // Replace "/home" with the route you want to navigate to
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
      <Stack direction="column" sx={{display:'flex',alignItems:'center'}}>
      
        <Typography className="pt-20 pb-20" variant="h1">
          Quantum Academy
        </Typography>
        <Button
          sx={{ width: "200px", height: "45px",borderRadius:'20px'}}
          type="button"
          variant="outlined"
          color="primary"
          onClick={handleExploreClick}
        >
          Explore
        </Button>
      </Stack>
    </Box>
  );
}
