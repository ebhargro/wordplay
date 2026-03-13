import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import OptionChips from "./components/Options";
import PromptDisplay from "./components/PromptDisplay";

type ViewMode = "DEFAULT" | "SELECTION" | "LOADING" | "PROMPT" | "ERROR";

export default function Index() {
  const [viewMode, setViewMode] = useState<ViewMode>("DEFAULT");
  const [prompt, setPrompt] = useState<{
    summary: string;
    prompt: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRandom, setIsRandom] = useState(false);

  const handleStoryClick = (random: boolean) => {
    setError(null);
    setIsRandom(random);
    setViewMode("SELECTION");
  };

  const handleReset = () => {
    setError(null);
    setPrompt(null);
    setIsRandom(false);
    setViewMode("DEFAULT");
  };

  const handlePromptGenerated = (data: {
    summary: string;
    prompt: string;
  }) => {
    setPrompt(data);
    setViewMode("PROMPT");
  };

  const handleError = (message: string) => {
    setError(message);
    setViewMode("ERROR");
  };

  const handleLoading = (loading: boolean) => {
    if (loading) setViewMode("LOADING");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {viewMode === "DEFAULT" && (
          <View style={styles.header}>
            <Text style={styles.title}>
              welcome to <Text style={styles.brandName}>wordplay</Text>
            </Text>
            <Text style={styles.description}>
              creative playground for{" "}
              <Text style={styles.bold}>writers everywhere</Text>
            </Text>
            <Text style={styles.subtitle}>choose your adventure:</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => handleStoryClick(false)}
              >
                <Text style={styles.primaryButtonText}>
                  i want to pick my story
                </Text>
              </TouchableOpacity>

              <Text style={styles.orText}>... or ...</Text>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => handleStoryClick(true)}
              >
                <Text style={styles.secondaryButtonText}>
                  give me a random exercise
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {viewMode === "SELECTION" && (
          <View style={styles.content}>
            <OptionChips
              isRandom={isRandom}
              onPromptGenerated={handlePromptGenerated}
              onError={handleError}
              onLoading={handleLoading}
            />
            <TouchableOpacity style={styles.homeButton} onPress={handleReset}>
              <Text style={styles.homeButtonText}>home</Text>
            </TouchableOpacity>
          </View>
        )}

        {viewMode === "LOADING" && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0070f3" />
            <Text style={styles.loadingText}>
              crafting your writing exercise...
            </Text>
          </View>
        )}

        {viewMode === "PROMPT" && prompt && (
          <View style={styles.content}>
            <PromptDisplay prompt={prompt} />
            <View style={styles.promptActions}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleReset}
              >
                <Text style={styles.primaryButtonText}>choose a new story</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {viewMode === "ERROR" && (
          <View style={styles.centered}>
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error || "Something went wrong. Please try again."}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleReset}
            >
              <Text style={styles.primaryButtonText}>try again</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/ebonyhargro/")
            }
          >
            <Text style={styles.footerText}>
              made with love by Ebony, a programmer with a love for storytelling
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  brandName: {
    color: "#0070f3",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonGroup: {
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#0070f3",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 250,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#0070f3",
    minWidth: 250,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#0070f3",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    color: "#999",
    fontSize: 14,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    color: "#555",
    fontSize: 16,
  },
  promptActions: {
    marginTop: 24,
    alignItems: "center",
  },
  homeButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  homeButtonText: {
    color: "#0070f3",
    fontSize: 16,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    maxWidth: 300,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    paddingTop: 20,
    width: "100%",
  },
  footerText: {
    color: "#0070f3",
    textAlign: "center",
    fontSize: 13,
  },
});
