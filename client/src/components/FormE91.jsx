import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BarGraph from "./graphs/E91Chart";
import E91ShiftedKey from "./graphs/E91ShiftedKey";

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
  const [Response, setResponse] = useState({});

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
      // console.log(data);
      setResponse(data);
      console.log(Response["Alice Bases"]);
    } catch (error) {
      console.error("Error:", error);
    }
    handleOpen();
  };
  return (
    <Stack direction="row" spacing={10}>
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
      </Stack>
      <Button
        sx={{ width: "100px", height: "37px" }}
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
          <Stack direction="column" spacing={5}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h3">E91 Analysis</Typography>
            </Box>

            <Stack direction="column">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <span className="font-bold">Alice Bases: </span>
                {Response["Alice Bases"]}
              </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <span className="font-bold">Bob Bases: </span>
                {Response["Bob Bases"]}
              </Typography>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <span className="font-bold">Sifted Key: </span>
                {Response["Sifted Key"]}
              </Typography>
            </Stack>

            <BarGraph
              aliceBases={Response["Alice Bases"]}
              bobBases={Response["Bob Bases"]}
            />
            <E91ShiftedKey shiftedKey={Response["Sifted Key"]} />
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}
