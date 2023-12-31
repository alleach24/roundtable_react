import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Roundtable Rodeo</Text>
    <Button
      title="Offline Game"
      onPress={() => navigation.navigate('offline')}
    />
    <Button title="Online Game" />
    <Button title="Rules" />
    {/* Website, Social Media, ... */}
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

export default HomeScreen;
