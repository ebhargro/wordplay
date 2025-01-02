import axios from "axios";

export const generatePrompt = async (selectedFilters) => {
  const filterPayload = selectedFilters.reduce((acc, filter) => {
    const [value, key] = filter.split(" ");
    if (key) acc[key] = value;
    return acc;
  }, {});

  try {
    const response = await axios.post("/api/generate-prompt", filterPayload);
    return response;
  } catch (error) {
    console.error("Error fetching story prompt:", error.message);
  }
};
