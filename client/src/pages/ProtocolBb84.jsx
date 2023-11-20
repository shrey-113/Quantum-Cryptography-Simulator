import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import Formbb84 from "../components/Formbb84";
import VideoPlayer from "../components/VideoPlayer";
import CodeHighlighter from "../components/CodeHighlighter";
import BB84QuantumKeyDistribution from "../components/SimulationBb84";

export default function ProtocolBb84() {
  return (
    <Stack sx={{ flexGrow: 1 }} direction="column" spacing={5}>
      <Typography className="pt-10" variant="h2" sx={{ textAlign: "center" }}>
        BB84
      </Typography>
      <Divider />
      <Formbb84 />
      <Divider />
      <Stack
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
        spacing={5}
      >
        <Typography className="" variant="h4" sx={{ textAlign: "center" }}>
          Video reference for BB84
        </Typography>
        <VideoPlayer />
      </Stack>
      <Divider />

      <Typography className="" variant="h4" sx={{ textAlign: "center" }}>
          Simulation
        </Typography>
        <BB84QuantumKeyDistribution/>

        <Divider />

      <Stack
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
        spacing={5}
      >
        <Typography className="" variant="h4" sx={{ textAlign: "center" }}>
          Code reference for BB84
        </Typography>
        <CodeHighlighter />
      </Stack>

      <Divider />
    </Stack>
  );
}
