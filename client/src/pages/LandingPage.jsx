import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import Logo from "../assests/logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
      <Stack direction="column" spacing={4} sx={{ display: "flex", alignItems: "center",paddingTop:'75px' }}>
        <img
          src={Logo}
          alt="logo"
          style={{ height: "280px", width: "280px" }}
        />
        <Typography variant="h1">
          Quantum Academy
        </Typography>
        <Button
          sx={{ width: "200px", height: "45px", borderRadius: "20px",bgcolor:'black' }}
          type="button"
          variant="outlined"
          onClick={handleExploreClick}
        >
          Explore
        </Button>
      </Stack>
    </Box>
  );
}
