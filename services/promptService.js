import axios from "axios";

export const generatePrompt = async (selectedFilters) => {
  const filterPayload = selectedFilters.reduce((acc, filter) => {
    const [value, key] = filter.split(" ");
    if (key) acc[key] = value;
    return acc;
  }, {});

  try {
    const response = await axios.post("/api/generate-prompt", filterPayload, {
      timeout: 30000, // 30 second timeout
    });
    return response;
  } catch (error) {
    // Provide meaningful error messages to the UI
    if (error.response) {
      const message =
        error.response.data?.error || "Something went wrong. Please try again.";
      throw new Error(message);
    } else if (error.code === "ECONNABORTED") {
      throw new Error(
        "Request timed out. Please check your connection and try again."
      );
    } else {
      throw new Error("Unable to connect. Please check your internet connection.");
    }
  }
};
