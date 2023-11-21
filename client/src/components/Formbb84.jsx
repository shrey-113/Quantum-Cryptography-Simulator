import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import LineGraph from "./graphs/LineGraph";
// import Divider from '@mui/material/Divider';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Formbb84() {
  const [numQubits, setNumQubits] = useState("");
  const [errorRate, setErrorRate] = useState("");
  const [response, setResponse] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      console.log(data)
      // setResponse(data);
      // console.log(response?.results)
    } catch (error) {
      console.error("Error:", error);
    }
    handleOpen();
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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack direction="column">
                <LineGraph />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {response?.results}
                </Typography>
              </Stack>
            </Box>
          </Modal>
        </Stack>
      </Stack>
    </form>
  );
}
