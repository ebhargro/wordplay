// API base URL - update this to your deployed web app URL before release
const API_BASE_URL = __DEV__
  ? "http://localhost:3000"
  : "https://your-wordplay-app.vercel.app";

export const generatePrompt = async (selectedFilters) => {
  const filterPayload = selectedFilters.reduce((acc, filter) => {
    const [value, key] = filter.split(" ");
    if (key) acc[key] = value;
    return acc;
  }, {});

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filterPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  }
};
