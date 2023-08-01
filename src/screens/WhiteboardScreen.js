import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const actionInitials = ['S', 'P', 'DW', 'TK'];
const actionNames = ['Slash', 'Parry', 'Death Wish', 'Throwing Knives'];

const WhiteboardScreen = ({ navigation }) => {
  const [numAlliances, setNumAlliances] = useState(0);
  const [numAssistedKills, setNumAssistedKills] = useState(0);
  const [numSoloKills, setNumSoloKills] = useState(0);

  const [killModalVisible, setKillModalVisible] = useState(false);

  const [allyName, setAllyName] = useState('');
  const [targetName, setTargetName] = useState('');
  const [target2Name, setTarget2Name] = useState('');
  const [selectedActionButton, setSelectedActionButton] = useState(0);

  const onKillModalOpen = () => {
    setKillModalVisible(true);
  };

  const onKillModalClose = () => {
    setKillModalVisible(false);
  };

  const handleActionSelect = (index) => {
    setSelectedActionButton(index);
  };

  const handleClearNames = () => {
    setAllyName('');
    setTargetName('');
    setTarget2Name('');
  };

  const handleReset = () => {
    setNumAlliances(0);
    setNumAssistedKills(0);
    setNumSoloKills(0);
  };

  return (
    <View style={styles.container}>
      <KillModal
        isVisible={killModalVisible}
        setIsVisible={setKillModalVisible}
        numAssistedKills={numAssistedKills}
        setNumAssistedKills={setNumAssistedKills}
        numSoloKills={numSoloKills}
        setNumSoloKills={setNumSoloKills}
        onClose={onKillModalClose}
      />

      <Text>Number of Kills: </Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={onKillModalOpen}
      >
        <Text style={styles.textStyle}>{numAssistedKills + numSoloKills}</Text>
      </Pressable>
      <View style={styles.flexRow}>
        <Text>Number of Unique Alliances:</Text>
        <Button
          title="-"
          onPress={() =>
            setNumAlliances((prevAlliances) => Math.max(prevAlliances - 1, 0))
          }
        />
        <Text>{numAlliances}</Text>
        <Button
          title="+"
          onPress={() => setNumAlliances((prevAlliances) => prevAlliances + 1)}
        />
      </View>

      <Text>Damage Bonus: +{numSoloKills * 2 + numAssistedKills}</Text>
      <Text>HP: 2</Text>

      <View style={[styles.flexRow, styles.alignItemsCenter]}>
        <Text>Ally: </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(newName) => setAllyName(newName)}
          value={allyName}
          placeholder="Ally Name"
        />
      </View>
      <Text>Action: {actionNames[selectedActionButton]}</Text>
      <View style={[styles.flexRow, styles.alignItemsCenter]}>
        {actionInitials.map((actionInitial, index) => (
          <Pressable
            onPress={() => handleActionSelect(index)}
            style={[
              styles.button,
              selectedActionButton === index ? styles.active : null,
            ]}
          >
            <Text style={styles.text}>{actionInitial}</Text>
          </Pressable>
        ))}
      </View>
      {selectedActionButton !== 2 && (
        <View style={[styles.flexRow, styles.alignItemsCenter]}>
          <Text>Target Opponent{selectedActionButton === 3 ? ' 1' : ''}: </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(newName) => setTargetName(newName)}
            value={targetName}
            placeholder="Target Name"
          />
        </View>
      )}
      {selectedActionButton === 3 && (
        <View style={[styles.flexRow, styles.alignItemsCenter]}>
          <Text>Target Opponent 2: </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(newName) => setTarget2Name(newName)}
            value={target2Name}
            placeholder="Target Name"
          />
        </View>
      )}

      <Button title="Clear Names" onPress={handleClearNames} />
      <Button title="Reset Board" onPress={handleReset} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const KillModal = (props) => {
  const {
    isVisible,
    setIsVisible,
    numAssistedKills,
    setNumAssistedKills,
    numSoloKills,
    setNumSoloKills,
    onClose,
  } = props;

  const overlayRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      setIsVisible(false);
    }
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <TouchableOpacity
        ref={overlayRef}
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleOverlayClick}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.flexRow, styles.alignItemsCenter]}>
              <Text>Number of Assisted Kills: </Text>
              <Button
                title="-"
                onPress={() =>
                  setNumAssistedKills((prevAssistedKills) =>
                    Math.max(prevAssistedKills - 1, 0)
                  )
                }
              />
              <Text>{numAssistedKills}</Text>
              <Button
                title="+"
                onPress={() =>
                  setNumAssistedKills(
                    (prevAssistedKills) => prevAssistedKills + 1
                  )
                }
              />
            </View>
            <View style={[styles.flexRow, styles.alignItemsCenter]}>
              <Text>Number of Solo Kills: </Text>
              <Button
                title="-"
                onPress={() =>
                  setNumSoloKills((prevSoloKills) =>
                    Math.max(prevSoloKills - 1, 0)
                  )
                }
              />
              <Text>{numSoloKills}</Text>
              <Button
                title="+"
                onPress={() =>
                  setNumSoloKills((prevSoloKills) => prevSoloKills + 1)
                }
              />
            </View>
            <Pressable onPress={onClose}>
              <Text>Back</Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
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
  flexRow: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay color
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});

export default WhiteboardScreen;
