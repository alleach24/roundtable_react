import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RoundTimer = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Roundtable Rodeo</Text>
    <Button title="Back" onPress={() => navigation.goBack()} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RoundTimer;
