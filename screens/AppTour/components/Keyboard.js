import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

// QWERTY keyboard layout
const rows = [
  [
      { letter: 'Q', isActive: true, isRepeating: false },
      { letter: 'W', isActive: true, isRepeating: false },
      { letter: 'E', isActive: true, isRepeating: false },
      { letter: 'R', isActive: true, isRepeating: false },
      { letter: 'T', isActive: true, isRepeating: false },
      { letter: 'Y', isActive: true, isRepeating: false },
      { letter: 'U', isActive: true, isRepeating: false },
      { letter: 'I', isActive: true, isRepeating: false },
      { letter: 'O', isActive: true, isRepeating: false },
      { letter: 'P', isActive: true, isRepeating: false }
  ],
  [
      { letter: 'A', isActive: true, isRepeating: false },
      { letter: 'S', isActive: true, isRepeating: false },
      { letter: 'D', isActive: true, isRepeating: false },
      { letter: 'F', isActive: true, isRepeating: false },
      { letter: 'G', isActive: true, isRepeating: false },
      { letter: 'H', isActive: true, isRepeating: false },
      { letter: 'J', isActive: true, isRepeating: false },
      { letter: 'K', isActive: true, isRepeating: false },
      { letter: 'L', isActive: true, isRepeating: false }
  ],
  [
      { letter: 'nav1', isActive: true, isRepeating: false },
      { letter: 'Z', isActive: true, isRepeating: false },
      { letter: 'X', isActive: true, isRepeating: false },
      { letter: 'C', isActive: true, isRepeating: false },
      { letter: 'V', isActive: true, isRepeating: false },
      { letter: 'B', isActive: true, isRepeating: false },
      { letter: 'N', isActive: true, isRepeating: false },
      { letter: 'M', isActive: true, isRepeating: false },
      { letter: 'nav2', isActive: true, isRepeating: false },
  ]
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
    <>
      <View style={styles.container}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((keyObj, keyIndex) => {
              const { letter, isActive, isRepeating } = keyObj;
              if (letter == 'nav1' || letter == 'nav2') {
                return (<TouchableOpacity key={keyIndex} onPress={() => changeIndex(letter == 'nav1' ? 'prev' : 'next')} style={[styles.arrowBtn, letter == 'nav2' ? { transform: [{ scaleX: -1 }] } : {}]}>
                  <Image style={{ width: 24, height: 24 }} source={require(`../../../assets/images/icons/arrow.png`)} />
                </TouchableOpacity>)
              } else {
                return (
                  <TouchableOpacity
                    key={keyIndex}
                    disabled={!isActive}
                    style={[
                      styles.key,
                      (isRepeating && isActive) && { backgroundColor: '#01A56B' },
                      (!isRepeating && isActive) && { backgroundColor: '#d9d9d9' },
                      !isActive && {backgroundColor: '#f2f2f2'}
                    ]}
                    onPress={() => handleKeyPress(letter)}
                  >
                    <Text
                      style={[
                        styles.keyText,
                        isRepeating && isActive ? { color: '#fff' } : { color: '#000' },
                        !isActive && {color: '#d9d9d9'}
                      ]}
                    >
                      {letter}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        ))}
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 10
    // backgroundColor: 'red'
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
    fontSize: 26,
    fontWeight: '500',
  },
  arrowBtn: { width: 50, height: 51, borderRadius: 10, backgroundColor: '#AEAEAE', alignItems: 'center', justifyContent: 'center', top: 3, marginHorizontal: 3 },
});
export default Keyboard;