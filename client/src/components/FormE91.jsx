import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};
export default function FormE91() {
  const [numQubits, setNumQubits] = useState("");
  const [response, setResponse] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const makeRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/run-e91", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num_qubit_pairs: parseInt(numQubits),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response here if needed
      const data = await response.json();
      console.log(data);
      //   setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
    handleOpen();
  };
  return (
    <Stack direction="row" spacing={5}>
      <Stack direction="row">
        <Typography variant="h6" sx={{ padding: "1px", paddingRight: "15px" }}>
          No of Qubit pairs :
        </Typography>
        <TextField
          id="no-of-qubits"
          variant="outlined"
          type="number"
          size="small"
          value={numQubits}
          onChange={(e) => setNumQubits(e.target.value)}
          required
        />
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
            <Typography>fjanfkja</Typography>
          </Box>
        </Modal>
      </Stack>
    </Stack>
  );
}
