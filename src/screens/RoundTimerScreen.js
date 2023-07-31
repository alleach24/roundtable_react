import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RoundTimer = ({ navigation }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [milliSecondsRemaining, setMilliSecondsRemaining] = useState(
    4 * 60 * 100
  );

  return (
    <View style={styles.container}>
      <Timer
        time={milliSecondsRemaining}
        setTime={setMilliSecondsRemaining}
        isPaused={isPaused}
        setIsComplete={setIsComplete}
      />
      <Button title="Start" onPress={() => setIsPaused(false)} />
      <Button title="Pause" onPress={() => setIsPaused(true)} />

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Timer = (props) => {
  const { time, setTime, isPaused, setIsComplete } = props;
  const startTimeRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      startTimeRef.current = performance.now();

      intervalId = setInterval(() => {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTimeRef.current;
        setTime(Math.max(time - Math.floor(elapsedTime / 10), 0));
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isPaused, setTime]);

  useEffect(() => {
    if (time <= 0) {
      setIsComplete(true);
      console.log('timer completed');
    }
  }, [time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  return (
    <View style={styles.container}>
      <Text>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

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
