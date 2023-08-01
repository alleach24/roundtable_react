import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';

const roundTimeArr = [1, 3, 4, 6]; // Options for round lengths in minutes
const recommendedPlayers = ['3 - 5', '6 - 7', '8 - 9', '10+'];

const RoundTimer = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(2);
  const [isPaused, setIsPaused] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [milliSecondsRemaining, setMilliSecondsRemaining] = useState(
    roundTimeArr[activeButton] * 60 * 100
  );

  const handleTimeSelect = (index) => {
    // Change button styling
    setActiveButton(index);

    setMilliSecondsRemaining(roundTimeArr[index] * 60 * 100);
  };

  const handleSkip = () => {
    setIsPaused(true);
    setIsComplete(true);
    setMilliSecondsRemaining(roundTimeArr[activeButton] * 60 * 100);
  };

  return (
    <View style={styles.container}>
      {isPaused && (
        <Text>
          Recommended for {recommendedPlayers[activeButton]} players remaining
        </Text>
      )}
      {isPaused && (
        <View style={styles.minuteButtonContainer}>
          {roundTimeArr.map((roundMinutes, index) => (
            <Pressable
              onPress={() => handleTimeSelect(index)}
              style={[
                styles.button,
                activeButton === index ? styles.active : null,
              ]}
            >
              <Text style={styles.text}>{roundMinutes} m</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Timer
        time={milliSecondsRemaining}
        setTime={setMilliSecondsRemaining}
        isPaused={isPaused}
        setIsComplete={setIsComplete}
      />

      {isPaused ? (
        <Button title="Start" onPress={() => setIsPaused(false)} />
      ) : (
        <View>
          <Button title="Pause" onPress={() => setIsPaused(true)} />
          <Button title="Skip" onPress={handleSkip} />
        </View>
      )}

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
  }, [isPaused, setTime, time]);

  useEffect(() => {
    if (time <= 0) {
      setIsComplete(true);
    }
  }, [time, setIsComplete]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  return (
    <View>
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
  minuteButtonContainer: {
    flexDirection: 'row',
  },
  active: {
    backgroundColor: '#42f569',
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 2,
    elevation: 3,
    color: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },
});

export default RoundTimer;
