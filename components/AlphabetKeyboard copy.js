import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

// QWERTY keyboard layout
const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const AlphabetKeyboard = ({ activeLetters, setletterpressed, changeIndex }) => {

  const handleKeyPress = (key) => {
    setletterpressed(key);
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => {
            const isActive = activeLetters.includes(key);
            return (
              <TouchableOpacity
                key={keyIndex}
                disabled={!isActive} // Disable if key is not in activeLetters
                style={[
                  styles.key,
                  isActive
                    ? { backgroundColor: '#01A56B' }
                    : { backgroundColor: '#DDDBDE' },
                ]}
                onPress={() => handleKeyPress(key)}
              >
                <Text
                  style={[
                    styles.keyText,
                    isActive ? { color: '#fff' } : { color: '#B0B0B0' },
                  ]}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => changeIndex('prev')} style={styles.arrowBtn}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/icons/arrow.png')} />
        </TouchableOpacity>
        <View style={styles.spacebar}></View>
        <TouchableOpacity style={[styles.arrowBtn, { transform: [{ scaleX: -1 }] }]} onPress={() => changeIndex('next')}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/icons/arrow.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2
  },
  key: {
    width: width * 0.08, // Responsive key width
    height: width * 0.12, // Height for keys
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  arrowBtn: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#AEAEAE', alignItems: 'center', justifyContent: 'center' },
  spacebar: {
    width: '55%',
    height: 50,
    backgroundColor: '#DDDBDE'
  }
});
export default AlphabetKeyboard;