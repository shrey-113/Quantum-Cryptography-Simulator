import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center", paddingTop: 3 }}>
      <Typography variant="h2" gutterBottom>
        Welcome, Learner
      </Typography>
      <Typography paragraph>
        Welcome to Quantum Academy, your gateway to the fascinating world of
        quantum mechanics and Quantum Key Distribution (QKD). Whether you're a
        curious mind eager to explore the fundamental principles of quantum
        physics or a passionate enthusiast seeking to delve into the
        cutting-edge field of quantum communication, Quantum Academy is your
        platform for knowledge, collaboration, and community.
      </Typography>
    </Box>
  );
}
