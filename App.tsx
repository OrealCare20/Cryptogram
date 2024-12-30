import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import Subscription from './components/Subscription';
import StartGame from './components/StartGame';

const { width, height } = Dimensions.get('screen');

const CALENDER_WIDTH = width / 2 - 100;
const CALENDER_RATIO = CALENDER_WIDTH / 288;

const BRAIN_WIDTH = width / 2;
const BRAIN_RATIO = BRAIN_WIDTH / 663;

const START_BUTTON = width / 2;
const START_BUTTON_RATIO = START_BUTTON / 353;

const App = () => {
  return (
    <>

      {/* <StartGame /> */}

      <View style={style.container}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <Image style={style.headerBadgeIcon} source={require('./assets/images/OBJECTS.png')} />
          <View style={style.headerBadge}>
            <Text style={style.headerText}>Full</Text>
          </View>
          <Image style={{ width: 30, height: 30, marginLeft: 4 }} source={require('./assets/images/plus.png')} />
        </View>

        <View style={style.levelContainer}>
          <OutlinedText
            text={'Daily Challenge'}
            fontSize={30}
            fontWeight={'500'}
            outlineColor={'#000'}
            shadowLine={2}
            fontFamily='Roboto-BlackItalic'
            customStyle={{ marginVertical: 20 }}
          />

          <ImageBackground style={style.calender} source={require('./assets/images/calender.png')}>
            <OutlinedText
              text={'15'}
              fontSize={18}
              outlineColor={'#000'}
              shadowLine={2}
              fontFamily='Roboto-BlackItalic'
              customStyle={{ marginTop: 15, textAlign: 'center' }}
            />
            <OutlinedText
              text={'Level'}
              fontSize={18}
              outlineColor={'#000'}
              shadowLine={2}
              fontFamily='Roboto-BlackItalic'
            />
          </ImageBackground>

          <View style={{ width: '70%' }}>
            <OutlinedText
              text={'Complete 15 Level to Unlock'}
              fontSize={22}
              outlineColor={'#000'}
              color='#FFB002'
              shadowLine={2}
              fontFamily='Roboto-BlackItalic'
              customStyle={{ textAlign: 'center', alignSelf: 'center', marginBottom: 25 }}
            />
          </View>
        </View>

        <Image style={style.brain} source={require('./assets/images/brain.png')} />
        
        <TouchableOpacity>
          <ImageBackground style={style.startButton} source={require('./assets/images/button.png')}>
            <Image source={require('./assets/images/play-icon.png')} style={{ width: 21, height: 24.6, left: '-2%' }} />
            <OutlinedText
              text={'Start'}
              fontSize={30}
              fontWeight={'500'}
              outlineColor={'#000'}
              shadowLine={2}
              fontFamily='Roboto-BlackItalic'
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <Subscription />
    </>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `rgba(255, 255, 255, 1)`,
    padding: 10
  },
  headerBadge: { width: 53, height: 32, backgroundColor: '#E7D2C6', borderRadius: 7, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 10, marginLeft: '5%' },
  headerText: { color: '#BE8763', fontSize: 12, fontWeight: '600' },
  headerBadgeIcon: {
    width: 34,
    height: 34,
    position: 'absolute',
    zIndex: 1
  },
  levelContainer: {
    backgroundColor: '#EBDFD7',
    width: width * 0.60,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50
  },
  calender: {
    width: CALENDER_WIDTH,
    height: 312 * CALENDER_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brain: {
    width: BRAIN_WIDTH,
    height: 477 * BRAIN_RATIO,
    alignSelf: 'center',
    marginVertical: 70
  },
  startButton: {
    width: START_BUTTON,
    height: 133 * START_BUTTON_RATIO,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default App;