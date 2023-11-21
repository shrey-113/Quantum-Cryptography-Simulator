import React, { useState } from "react";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
// import Divider from '@mui/material/Divider';

export default function Formbb84() {
  const [numQubits, setNumQubits] = useState("");
  const [errorRate, setErrorRate] = useState("");

  const makeRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/run-bb84", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num_qubits: parseInt(numQubits),
          error_rate: parseFloat(errorRate),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response here if needed
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form>
      <Stack direction="row" spacing={5}>
        <Stack direction="row">
          <Typography
            variant="h6"
            sx={{ padding: "1px", paddingRight: "15px" }}
          >
            No of Qubits :
          </Typography>
          <TextField
            id="no-of-qubits"
            variant="outlined"
            type="number"
            size="small"
            required
            value={numQubits}
            onChange={(e) => setNumQubits(e.target.value)}
          />
        </Stack>

        <Stack direction="row">
          <Typography
            variant="h6"
            sx={{ padding: "1px", paddingRight: "15px" }}
          >
            Error Rate :
          </Typography>
          <TextField
            id="error-rate"
            variant="outlined"
            type="decimal"
            size="small"
            required
            value={errorRate}
            onChange={(e) => setErrorRate(e.target.value)}
          />
        </Stack>

        <Stack sx={{ display: "flex", padding: "1px" }}>
          <Button
            sx={{ width: "100px", height: "35px" }}
            type="button"
            variant="contained"
            color="primary"
            onClick={makeRequest}
          >
            Simulate
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
