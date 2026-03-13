import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { generatePrompt } from "../services/api";

const FILTERS = [
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

const CATEGORIES = [...new Set(FILTERS.map((f) => f.category))];

export default function OptionChips({
  isRandom,
  onPromptGenerated,
  onError,
  onLoading,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    if (isRandom) {
      const randomSelections = CATEGORIES.map((category) => {
        const options = FILTERS.filter((f) => f.category === category);
        return options[Math.floor(Math.random() * options.length)].name;
      });
      setSelectedFilters(randomSelections);
    }
  }, [isRandom]);

  // Auto-submit when random filters are set
  useEffect(() => {
    if (isRandom && selectedFilters.length === CATEGORIES.length) {
      handleSubmit(selectedFilters);
    }
  }, [selectedFilters, isRandom]);

  const handleFilterPress = (filter) => {
    setSelectedFilters((prev) => {
      const withoutCategory = prev.filter(
        (item) => !item.includes(filter.category)
      );
      if (prev.includes(filter.name)) {
        return withoutCategory;
      }
      return [...withoutCategory, filter.name];
    });
  };

  const handleSubmit = async (filtersToUse) => {
    const activeFilters = filtersToUse || selectedFilters;

    const selectedCategories = activeFilters.map((f) => f.split(" ")[1]);
    const missingCategories = CATEGORIES.filter(
      (c) => !selectedCategories.includes(c)
    );

    if (missingCategories.length > 0) {
      onError(`Please select an option for: ${missingCategories.join(", ")}`);
      return;
    }

    try {
      onLoading(true);
      const data = await generatePrompt(activeFilters);
      onPromptGenerated({ summary: data.summary, prompt: data.prompt });
    } catch (err) {
      onError(err.message || "Failed to generate prompt.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>customize your story:</Text>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map((category) => {
          const isExpanded = expandedCategory === category;
          const hasSelection = selectedFilters.some((f) =>
            f.includes(category)
          );
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                isExpanded && styles.categoryChipActive,
                hasSelection && styles.categoryChipSelected,
              ]}
              onPress={() =>
                setExpandedCategory(isExpanded ? null : category)
              }
            >
              <Text
                style={[
                  styles.categoryChipText,
                  (isExpanded || hasSelection) &&
                    styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Expanded category options */}
      {expandedCategory && (
        <View style={styles.optionsRow}>
          {FILTERS.filter((f) => f.category === expandedCategory).map(
            (option) => {
              const isSelected = selectedFilters.includes(option.name);
              return (
                <TouchableOpacity
                  key={option.name}
                  style={[
                    styles.optionChip,
                    isSelected && styles.optionChipSelected,
                  ]}
                  onPress={() => handleFilterPress(option)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      isSelected && styles.optionChipTextSelected,
                    ]}
                  >
                    {option.name}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      )}

      {/* Selected filters summary */}
      {selectedFilters.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>your choices:</Text>
          <View style={styles.selectedRow}>
            {selectedFilters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={styles.selectedChip}
                onPress={() =>
                  handleFilterPress({
                    name: filter,
                    category: filter.split(" ")[1],
                  })
                }
              >
                <Text style={styles.selectedChipText}>{filter} x</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Submit button */}
      {!isRandom && (
        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedFilters.length === 0 && styles.submitButtonDisabled,
          ]}
          onPress={() => handleSubmit()}
          disabled={selectedFilters.length === 0}
        >
          <Text style={styles.submitButtonText}>build my prompt</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  categoryRow: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#333",
    backgroundColor: "#fff",
  },
  categoryChipActive: {
    backgroundColor: "#0070f3",
    borderColor: "#0070f3",
  },
  categoryChipSelected: {
    borderColor: "#0070f3",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#fff",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 12,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  optionChipSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#0070f3",
  },
  optionChipText: {
    fontSize: 13,
    color: "#555",
  },
  optionChipTextSelected: {
    color: "#0070f3",
    fontWeight: "600",
  },
  selectedContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  selectedLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  selectedRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  selectedChip: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  selectedChipText: {
    fontSize: 12,
    color: "#0070f3",
  },
  submitButton: {
    backgroundColor: "#0070f3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
