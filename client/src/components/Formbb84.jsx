import React from "react";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
// import Divider from '@mui/material/Divider';

export default function Formbb84() {
  return (
    <form>
      <Stack direction="row" spacing={5}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ padding: "1px",paddingRight:'15px' }}>
            No of Qubits :
          </Typography>
          <TextField
            id="no-of-qubits"
            variant="outlined"
            type="number"
            size='small'
            required
          />
        </Stack>

        <Stack direction="row">
          <Typography variant="h6" sx={{ padding: "1px" ,paddingRight:'15px'}}>
            Error Rate :
          </Typography>
          <TextField
            id="error-rate"
            variant="outlined"
            type="number"
            size='small'
            required
          />
        </Stack>

        <Stack sx={{display:'flex',padding:'1px'}}>
          <Button
            sx={{ width: "100px", height: "35px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Simulate
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
