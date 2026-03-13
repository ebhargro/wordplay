import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { TextField, Box, Button } from "@mui/material";
import styles from "../styles/Options.module.css";
import { generatePrompt } from "../services/promptService";

export default function OptionChips({
  setIsLoadingData,
  setHasPromptData,
  setPrompt,
  setError,
  isRandom,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  useEffect(() => {
    if (isRandom) {
      const randomSelections = categories.map((category) => {
        const options = filters.filter((f) => f.category === category);
        const randomOption =
          options[Math.floor(Math.random() * options.length)];
        return randomOption.name;
      });
      setSelectedFilters(randomSelections);
    }
  }, [isRandom]);

  // Auto-submit when random filters are set
  useEffect(() => {
    if (isRandom && selectedFilters.length === categories.length) {
      requestStoryPrompt(selectedFilters);
    }
  }, [selectedFilters, isRandom]);

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) => {
      // Remove any existing filter in the same category
      const withoutCategory = prev.filter(
        (item) => !item.includes(filter.category)
      );
      // If the clicked filter was already selected, just remove it
      if (prev.includes(filter.name)) {
        return withoutCategory;
      }
      // Otherwise add the new one
      return [...withoutCategory, filter.name];
    });
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
              color={
                selectedFilters.includes(option.name) ? "secondary" : "default"
              }
              onClick={() => handleFilterClick(option)}
              className={styles.optionChip}
            />
          ))}
      </Stack>
    );
  };

  const requestStoryPrompt = async (filtersToUse) => {
    const activeFilters = filtersToUse || selectedFilters;

    // Validate that all categories are selected
    const selectedCategories = activeFilters.map((f) => f.split(" ")[1]);
    const missingCategories = categories.filter(
      (c) => !selectedCategories.includes(c)
    );

    if (missingCategories.length > 0) {
      if (setError) {
        setError(
          `Please select an option for: ${missingCategories.join(", ")}`
        );
      }
      return;
    }

    try {
      if (setError) setError(null);
      setIsLoadingData(true);
      const result = await generatePrompt(activeFilters);
      const dataToDisplay = {
        summary: result?.data?.summary,
        prompt: result?.data?.prompt,
      };
      setIsLoadingData(false);
      setPrompt(dataToDisplay);
      setHasPromptData(true);
    } catch (err) {
      setIsLoadingData(false);
      if (setError) {
        setError(err.message || "Failed to generate prompt. Please try again.");
      }
    }
  };

  return (
    <>
      <Box>
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
        {renderExpandedOptions()}

        <div className={styles.inputContainer}>
          <TextField
            label="give me a story exercise with...."
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: true,
              startAdornment: selectedFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onDelete={() =>
                    handleFilterClick({
                      name: filter,
                      category: filter.split(" ")[1],
                    })
                  }
                  sx={{ marginRight: 0.5 }}
                />
              )),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => requestStoryPrompt()}
            disabled={selectedFilters.length === 0}
          >
            build my prompt
          </Button>
        </div>
      </Box>
    </>
  );
}
