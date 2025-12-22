import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import OptionChips from "./options";
import CircularProgress from "@mui/material/CircularProgress";
import { Prompt } from "./prompt";

// type ViewMode = {
//   SELECTION: 'SELECTION',
//   PROMPT: 'PROMPT'
// }

export default function Home() {
  const [viewMode, setViewMode] = useState("DEFAULT");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [hasPromptData, setHasPromptData] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [hasRandomStorySetting, setHasRandomStorySetting] = useState(false);

  useEffect(() => {
    if (isLoadingData) {
      setViewMode("LOADING")
    }
    else if (prompt && hasPromptData) {
      setViewMode("PROMPT");
    } else setViewMode("DEFAULT")
  }, [prompt, hasPromptData, isLoadingData]);

  const handleStoryClick = (randomPreference) => {
    setHasRandomStorySetting(randomPreference);
    setViewMode("SELECTION")
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>wordplay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       
        {viewMode === "DEFAULT" && 
          <>
           <h1 className={styles.title}>
          welcome to <span className={styles.wordplay_name}>wordplay</span>
        </h1>

        <p className={styles.description}>
          creative playground for <b> writers everywhere </b>
        </p>
        <p className={styles.description}>
         choose your adventure:
        </p>
        <p className={styles.description}>
       <button onClick={() => {handleStoryClick(false)}}> i want to pick what kind of story I want </button>  ... or <button onClick={()=> {handleStoryClick(true)}}> give me a random writing exercise.  </button>
          </p>
          </>
        }

        <div className={styles.grid}>
          {viewMode === "SELECTION" && (
            <OptionChips
              setPrompt={setPrompt}
              setHasPromptData={setHasPromptData}
              setIsLoadingData={setIsLoadingData}
              isRandom={hasRandomStorySetting}
            />
          )}
          {viewMode === "PROMPT" && <Prompt promptToDisplay={prompt} setViewMode={setViewMode} />}
          {viewMode === "LOADING" && <CircularProgress />}
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
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
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
