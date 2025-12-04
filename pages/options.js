import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { TextField, Box, Button } from "@mui/material";
import styles from "../styles/Options.module.css";
import { generatePrompt } from "../services/promptService";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function OptionChips() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
    const [prompt, setPrompt] = useState([]);
    const [hasData, setHasData] = useState(false);

  const filters = [
  { name: "short length", category: "length" },
  { name: "medium length", category: "length" },
  { name: "long length", category: "length" },

  { name: "first pov", category: "pov" },
  { name: "third pov", category: "pov" },
  { name: "second pov", category: "pov" },

  { name: "urban setting", category: "setting" },
  { name: "rural setting", category: "setting" },
  { name: "futuristic setting", category: "setting" },
  { name: "historical setting", category: "setting" },
  { name: "fantasy setting", category: "setting" },

  { name: "joyful tone", category: "tone" },
  { name: "suspenseful tone", category: "tone" },
  { name: "sorrowful tone", category: "tone" },

  { name: "slow pacing", category: "pacing" },
  { name: "fast pacing", category: "pacing" },
  { name: "dynamic pacing", category: "pacing" },
  ];
  
  const categories = [...new Set(filters.map((f) => f.category))];

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter.category)
        ? prev.filter((item) => !item.includes(filter?.category))
        : [...prev, filter.name]
    );
  };

  const renderExpandedOptions = () => {
    if (!expandedCategory) return null;
    return (
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
     {filters
  .filter((f) => f.category === expandedCategory)
  .map((option) => (
          <Chip
            key={option.name}
            label={option.name}
            color={selectedFilters.includes(option.name) ? "secondary" : "default"}
      onClick={() => handleFilterClick(option)}
      className={styles.optionChip}
          />
        ))}
      </Stack>
    );
  };

  const generateRandomFilters = () => {
    const randomSelections = categories.map((category) => { 
      const options = filters.filter((f) => f.category === category);
      const randomOption = options[Math.floor(Math.random() * options.length)];
      return randomOption.name;
    });
    setSelectedFilters(randomSelections);
  };

  const requestStoryPrompt = async () => {
    const result = await generatePrompt(selectedFilters);
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
           {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                color={expandedCategory === category ? "primary" : "default"}
               onClick={() => toggleCategory(category)}
               className={styles.optionChip}
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
