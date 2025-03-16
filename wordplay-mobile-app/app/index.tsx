// App.tsx (React Native)
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Alert } from 'react-native';
import OptionChips from './components/Options'
import { StatusBar } from 'expo-status-bar';

export default function Index() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>
          welcome to{' '}
          <Text style={styles.link} >
            wordplay
          </Text>
        </Text>
        <Text style={styles.description}>
          dynamic writing exercises for <Text style={styles.bold}>all</Text>
        </Text>
      </View>

      <OptionChips />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          made with love by Ebony, a programmer with a love for storytelling
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    color: '#0070f3',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    paddingTop: 20,
  },
  footerText: {
    color: '#0070f3',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
