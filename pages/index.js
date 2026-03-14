import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import OptionChips from "./options";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Prompt } from "../components/Prompt";

export default function Home() {
  const [viewMode, setViewMode] = useState("DEFAULT");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [hasPromptData, setHasPromptData] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [error, setError] = useState(null);
  const [hasRandomStorySetting, setHasRandomStorySetting] = useState(false);

  useEffect(() => {
    if (error) {
      setViewMode("ERROR");
    } else if (isLoadingData) {
      setViewMode("LOADING");
    } else if (prompt && hasPromptData) {
      setViewMode("PROMPT");
    } else if (viewMode === "LOADING" || viewMode === "ERROR") {
      setViewMode("DEFAULT");
    }
  }, [prompt, hasPromptData, isLoadingData, error]);

  const handleStoryClick = (randomPreference) => {
    setError(null);
    setHasRandomStorySetting(randomPreference);
    setViewMode("SELECTION");
  };

  const handleReset = () => {
    setError(null);
    setPrompt(null);
    setHasPromptData(false);
    setIsLoadingData(false);
    setViewMode("DEFAULT");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Wordplay - Creative Writing Exercises</title>
        <meta
          name="description"
          content="Dynamic, personalized writing exercises to spark your creativity. Choose your story parameters and get unique AI-generated prompts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Wordplay - Creative Writing Exercises" />
        <meta
          property="og:description"
          content="Dynamic writing exercises for creative writers everywhere."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {viewMode === "DEFAULT" && (
          <>
            <h1 className={styles.title}>
              welcome to <span className={styles.wordplay_name}>wordplay</span>
            </h1>

            <p className={styles.description}>
              creative playground for <b>writers everywhere</b>
            </p>
            <p className={styles.description}>choose your adventure:</p>
            <p className={styles.description}>
              <button onClick={() => handleStoryClick(false)}>
                i want to pick what kind of story I want
              </button>{" "}
              ... or{" "}
              <button onClick={() => handleStoryClick(true)}>
                give me a random writing exercise.
              </button>
            </p>
          </>
        )}

        <div className={styles.grid}>
          {viewMode === "SELECTION" && (
            <>
              <OptionChips
                setPrompt={setPrompt}
                setHasPromptData={setHasPromptData}
                setIsLoadingData={setIsLoadingData}
                setError={setError}
                isRandom={hasRandomStorySetting}
              />
              <button onClick={handleReset}>home</button>
            </>
          )}
          {viewMode === "PROMPT" && (
            <>
              <Prompt promptToDisplay={prompt} setViewMode={setViewMode} />
              <button onClick={handleReset}>home</button>
            </>
          )}
          {viewMode === "LOADING" && (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
              <p>crafting your writing exercise...</p>
            </div>
          )}
          {viewMode === "ERROR" && (
            <div style={{ textAlign: "center", maxWidth: 500 }}>
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error || "Something went wrong. Please try again."}
              </Alert>
              <button onClick={handleReset}>try again</button>
            </div>
          )}
        </div>
      </main>

      <footer>
        <a
          href="https://www.linkedin.com/in/ebonyhargro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          made with love by ebony, a programmer with a love for storytelling
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
