import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function OptionChips() {
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Options:</Text>
      {Object.keys(filterOptions).map((category) => (
        <View key={category} style={styles.category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {filterOptions[category].map((option) => (
            <Button
              key={option}
              title={option}
              onPress={() => toggleFilter(option)}
            />
          ))}
        </View>
      ))}
      <Text style={styles.selectedFilters}>
        Selected Filters: {selectedFilters.join(", ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  category: {
    marginVertical: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedFilters: {
    marginTop: 16,
    fontStyle: "italic",
  },
});
