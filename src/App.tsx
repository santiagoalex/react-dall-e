import { useState } from "react";
import OpenAI from "openai";
import TextArea from "./components/TextArea/TextArea";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Una noche estrellada en medellin mor"
  );


  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_Open_AI_Key,
    dangerouslyAllowBrowser: true
  });

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });
    setLoading(false);
    setResult(res?.data[0]?.url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2>Generate an Image using Open AI API</h2>
          <div className="general_container">
            <TextArea placeholder={placeholder} setPrompt={setPrompt} />
            <textarea
              className="app-input"
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
              rows={10}
              cols={40}
            />
            <button onClick={generateImage}>Generate an Image</button>
            {result && result.length > 0 ? (
              <img className="result-image" src={result} alt="result" />
            ) : (
              <></>
            )}
          </div>

        </>
      )}
    </div>
  );
}

export default App;