import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

// QWERTY keyboard layout
const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const Keyboard = ({ activeLetters, setletterpressed, changeIndex, click, setclick }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Start with normal scale (1)

  useEffect(() => {
    let scaleLoop;

    if (click === 2) {
      // Only animate when click is 2
      scaleLoop = Animated.loop(
        Animated.sequence([
          // Scale up from 1 to 2
          Animated.timing(scaleAnim, {
            toValue: 2, // Scale to 2
            duration: 1000, // Duration for scaling up (1 second)
            useNativeDriver: true, // Use native driver for performance
          }),
          // Scale down from 2 to 1
          Animated.timing(scaleAnim, {
            toValue: 1, // Scale back to 1
            duration: 1000, // Duration for scaling down (1 second)
            useNativeDriver: true, // Use native driver for performance
          }),
        ])
      );
      scaleLoop.start(); // Start the looping animation
    } else {
      // Reset scale when click is not 2
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300, // Short duration to reset quickly
        useNativeDriver: true,
      }).start();
    }

    // Cleanup on unmount or when click changes
    return () => scaleLoop?.stop();
  }, [click, scaleAnim]);

  const handleKeyPress = (key) => {
    setletterpressed(key);
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => {
            const isActive = activeLetters.includes(key);
            if (click === 2 && key == 'E') {
              return (
                <TouchableOpacity
                  key={keyIndex}
                  disabled={!isActive} // Disable if key is not in activeLetters
                  style={[
                    styles.key,
                    isActive
                      ? { backgroundColor: '#DDDBDE', borderWidth: 2, borderColor: '#01A56B' }
                      : { backgroundColor: '#01A56B' },
                  ]}
                  onPress={() => {handleKeyPress(key); setclick(click + 1)}}
                >
                  <Animated.Text
                    style={[
                      [styles.keyText, {
                        transform: [{ scale: scaleAnim }], // Apply scaling to the text
                      }],
                      isActive ? { color: '#01A56B' } : { color: '#fff' }
                    ]}
                  >
                    {key}
                  </Animated.Text>
                </TouchableOpacity>
              );
            } else {
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
                      isActive ? { color: '#fff' } : { color: '#B0B0B0' }
                    ]}
                  >
                    {key}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      ))}

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => changeIndex('prev')} style={styles.arrowBtn}>
          <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/icons/arrow.png')} />
        </TouchableOpacity>
        <View style={styles.spacebar}></View>
        <TouchableOpacity style={[styles.arrowBtn, { transform: [{ scaleX: -1 }] }]} onPress={() => changeIndex('next')}>
          <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/icons/arrow.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
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
  },
  pointingGif: {
    width: 40,
    height: 87,
    resizeMode: 'contain',
    bottom: '50%',
    transform: [{ scale: 2 }],
    position: 'absolute',
    zIndex: 3,
    bottom: '0w%'
  },
});
export default Keyboard;