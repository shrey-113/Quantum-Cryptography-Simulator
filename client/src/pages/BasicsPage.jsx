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
      const result = await openai.chat.completions.create({
        messages: [{ role: "user", content: {prompt } }],
        model: "gpt-3.5-turbo",
        stream:"true"
        
      });
      for await (const chunk of result) {
        console.log(chunk.choices[0]?.delta?.content || "");
    }

      console.log(result)
      setApiResponse(result);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", e);
    }

    setLoading(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
