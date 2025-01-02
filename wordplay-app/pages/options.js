import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { TextField, Box, Button } from "@mui/material";
import styles from "../styles/Options.module.css";
import { generatePrompt } from "../services/generatePrompt";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function OptionChips() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
    const [prompt, setPrompt] = useState([]);
    const [hasData, setHasData] = useState(false);

  const filterOptions = {
    length: ["short length", "medium length", "long length"],
    pov: ["first pov", "third pov", "second pov"],
    setting: [
      "urban setting",
      "rural setting",
      "futuristic setting",
      "historical setting",
      "fantasy setting",
    ],
    tone: ["joyful tone", "suspenseful tone", "sorrowful tone"],
    pacing: ["slow pacing", "fast pacing", "dynamic pacing"],
  };

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const renderExpandedOptions = () => {
    if (!expandedCategory) return null;
    return (
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
        {filterOptions[expandedCategory].map((option) => (
          <Chip
            key={option}
            label={option}
            color={selectedFilters.includes(option) ? "secondary" : "default"}
            onClick={() => handleFilterClick(option)}
          />
        ))}
      </Stack>
    );
  };

  const generateRandomFilters = () => {
    const randomSelections = Object.keys(filterOptions).flatMap((category) => {
      const options = filterOptions[category];
      const randomOption = options[Math.floor(Math.random() * options.length)];
      return randomOption;
    });
    setSelectedFilters(randomSelections);
  };

  const requestStoryPrompt = async () => {
    console.log(selectedFilters);
    const result = await generatePrompt(selectedFilters);
    console.log(result);
    const dataToDisplay = {
      summary: result?.data?.summary,
      prompt: result?.data?.prompt,
    };
      setPrompt(dataToDisplay);
      setHasData(true);
  };

  return (
    <>
      <Box>
        {renderExpandedOptions()}
        <div className={styles.configOptions}>
          <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
            {Object.keys(filterOptions).map((category) => (
              <Chip
                key={category}
                label={category}
                color={expandedCategory === category ? "primary" : "default"}
                onClick={() => toggleCategory(category)}
              />
            ))}
          </Stack>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={generateRandomFilters}
          className={styles.randomBtn}
        >
          random
        </Button>
        <div className={styles.inputContainer}>
          <TextField
            label="add your custom preferences"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: selectedFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onDelete={() => handleFilterClick(filter)}
                  sx={{ marginRight: 0.5 }}
                />
              )),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={requestStoryPrompt}
          >
            submit
          </Button>
        </div>
      </Box>
          <Divider />
          {hasData && 
              <>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" > 
              {prompt.summary}
          </Alert>
      <h2>{JSON.stringify(prompt.prompt)}</h2>
          </>
          }
          
    </>
  );
}
