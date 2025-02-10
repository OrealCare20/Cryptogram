import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

// QWERTY keyboard layout with isActive and isRepeating properties

const AlphabetKeyboard = ({ setletterpressed, changeIndex, rows }) => {
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
                  <Image style={{ width: 24, height: 24 }} source={require(`../assets/images/icons/arrow.png`)} />
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
export default AlphabetKeyboard;