import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PromptDisplay({ prompt }) {
  return (
    <View style={styles.container}>
      <View style={styles.successBanner}>
        <Text style={styles.successText}>{prompt.summary}</Text>
      </View>

      <View style={styles.promptCard}>
        <Text style={styles.promptText}>{prompt.prompt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  successBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  successText: {
    color: "#2E7D32",
    fontSize: 14,
    textAlign: "center",
  },
  promptCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#0070f3",
    backgroundColor: "#F8F9FA",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 20,
  },
  promptText: {
    fontSize: 17,
    lineHeight: 28,
    color: "#333",
    fontStyle: "italic",
  },
});
