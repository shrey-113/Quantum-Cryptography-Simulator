import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import CodeHighlighter from "../components/CodeHighlighter";
import FormE91 from "../components/FormE91";

export default function ProtocolE91() {
  return (
    <Stack sx={{ flexGrow: 1 }} direction="column" spacing={5}>
      <Typography className="pt-10" variant="h2" sx={{ textAlign: "center" }}>
        E91
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormE91 />
      </Box>
      <Divider />
      <Stack
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
        spacing={5}
      >
        <Typography className="" variant="h4" sx={{ textAlign: "center" }}>
          Video reference for E91
        </Typography>
        <iframe
          width="860"
          height="465"
          src="https://www.youtube.com/embed/NNUTqggOhq0?si=7GdgtsSu7cjkl255"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Stack>
      <Divider />
      <Stack
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
        spacing={5}
      >
        <Typography className="" variant="h4" sx={{ textAlign: "center" }}>
          Code reference for E91
        </Typography>
        <CodeHighlighter link="https://nbviewer.org/github/Mandy767/QKD/blob/main/E91%20Quantum%20Key%20Distribution%20Protocol.ipynb" />
      </Stack>

      <Divider />
    </Stack>
  );
}
