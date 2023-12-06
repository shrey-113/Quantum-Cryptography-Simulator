import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const BasicsPage = () => {
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/chatresponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiResponse(data.text);
      setOpenModal(true);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", e);
    }

    setLoading(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", paddingTop: "50px",paddingRight:"20px" }}>
          Q-Bot
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 350px)", // Adjust the height as needed
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextareaAutosize
            rowsMin={4}
            placeholder="Please ask Q-Bot"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "2px",
              marginRight: "20px",
              border: "1px solid black", // Adding margin between Textarea and Button
            }}
          />
          <Button
            style={{
              border: "1px solid black",
              padding: "8px 24px",
              backgroundColor: "#3f51b5",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              outline: "none",
              border: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading || prompt.length === 0}
            type="submit"
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {prompt}
          </Typography>

          <Typography>{apiResponse}</Typography>
        </DialogContent>
      </Dialog>

      {error && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        </div>
      )}
    </>
  );
};

export default BasicsPage;
