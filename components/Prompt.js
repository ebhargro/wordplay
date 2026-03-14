import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";

export const Prompt = (props) => {
  const { promptToDisplay, setViewMode } = props;

  const handleNewPromptClick = () => {
    setViewMode("DEFAULT");
  };

  return (
    <>
      <Divider />
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        {promptToDisplay.summary}
      </Alert>
      <div
        style={{
          maxWidth: 600,
          margin: "20px auto",
          padding: "20px",
          lineHeight: 1.8,
          fontSize: "1.1rem",
          fontStyle: "italic",
          color: "#333",
          borderLeft: "4px solid #0070f3",
          backgroundColor: "#f8f9fa",
          borderRadius: "0 8px 8px 0",
        }}
      >
        {promptToDisplay.prompt}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewPromptClick}
      >
        choose a new story
      </Button>
    </>
  );
};
