import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OfflineScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Offline Game</Text>
    <Button
      title="Whiteboard"
      onPress={() => navigation.navigate('whiteboard')}
    />
    <Button
      title="Round Timer"
      onPress={() => navigation.navigate('round-timer')}
    />
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

export default OfflineScreen;
