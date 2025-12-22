import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";

export const Prompt = (props) => {
    const { promptToDisplay, setViewMode } = props;

    const handleNewPromptClick = () => {
        setViewMode("DEFAULT");
    }
  return (
    <>
      <Divider />
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        {promptToDisplay.summary}
      </Alert>
          <h2>{JSON.stringify(promptToDisplay.prompt)}</h2>
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
