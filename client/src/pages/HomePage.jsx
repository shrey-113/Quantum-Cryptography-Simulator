import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function HomePage() {
  return <Box sx={{ flexGrow: 1,display:'flex',justifyContent:'center' }} className="pt-3">

    <Stack direction="row">
      <Typography className="pt-10" variant="h2">
            Welcome, Learner
      </Typography>
    </Stack>
  </Box>;
}
