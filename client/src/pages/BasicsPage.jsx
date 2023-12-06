import { useState } from "react";
import OpenAI from "openai";

const BasicsPage = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError(null); // Reset error state

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

      // Handle the response here if needed
      const data = await response.json();
      console.log(data);
      setApiResponse(data.text);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", e);
    }

    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={prompt}
            placeholder="Please ask OpenAI"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button disabled={loading || prompt.length === 0} type="submit">
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {error && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <pre>
            <strong>Error:</strong> {error}
          </pre>
        </div>
      )}
      {apiResponse && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <pre>
            <strong>API response:</strong> {apiResponse}
          </pre>
        </div>
      )}
    </>
  );
};

export default BasicsPage;
