import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';

const { width, height } = Dimensions.get('screen');

const CALENDER_WIDTH = width / 3 - 50;
const CALENDER_RATIO = CALENDER_WIDTH / 288;

const BRAIN_WIDTH = width / 2;
const BRAIN_RATIO = BRAIN_WIDTH / 663;

const START_BUTTON = width / 2;
const START_BUTTON_RATIO = START_BUTTON / 353;

const COIN_BANK = width / 2 - 70;
const COIN_BANK_RATIO = COIN_BANK / 427;


const StartGame = () => {
    return (
        <View style={style.container}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image style={style.headerBadgeIcon} source={require('../assets/images/OBJECTS.png')} />
                <View style={style.headerBadge}>
                    <Text style={style.headerText}>Full</Text>
                </View>
                <Image style={{ width: 30, height: 30, marginLeft: 4 }} source={require('../assets/images/plus.png')} />
            </View>

            <View style={style.mainContainer}>
                {/* Daily Challenge Section */}
                <View style={style.levelContainer}>
                    <OutlinedText
                        text={'Daily Challenge'}
                        fontSize={20}
                        fontWeight={'500'}
                        outlineColor={'#000'}
                        shadowLine={2}
                        fontFamily="Roboto-BlackItalic"
                        customStyle={{ marginVertical: 5 }}
                    />

                    <ImageBackground style={style.calender} source={require('../assets/images/calender.png')}>
                        <OutlinedText
                            text={'15'}
                            fontSize={19}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily="Roboto-BlackItalic"
                            customStyle={{ marginTop: 15, textAlign: 'center' }}
                        />
                        <OutlinedText
                            text={'Level'}
                            fontSize={19}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily="Roboto-BlackItalic"
                            customStyle={{ marginTop: -10, textAlign: 'center' }}
                        />
                    </ImageBackground>

                    <View style={style.centeredTextContainer}>
                        <OutlinedText
                            text={'Complete 15 Level to Unlock'}
                            fontSize={15}
                            outlineColor={'#000'}
                            color="#FFB002"
                            shadowLine={2}
                            fontFamily="Roboto-BlackItalic"
                            customStyle={{ textAlign: 'center', alignSelf: 'center', marginBottom: 20, marginTop: 7 }}
                        />
                    </View>
                </View>

                {/* Event Section */}
                <View style={style.levelContainer}>
                    <OutlinedText
                        text={'Event'}
                        fontSize={20}
                        fontWeight={'500'}
                        outlineColor={'#000'}
                        shadowLine={2}
                        fontFamily="Roboto-BlackItalic"
                        customStyle={{ marginVertical: 5, textAlign: 'center' }}
                    />
                    <Image
                        style={style.coinBank}
                        source={require('../assets/images/coin-bank.png')}
                    />
                    <Text style={style.progress}>Progress: 7/120</Text>

                    <ImageBackground style={style.goBtn} source={require('../assets/images/go.png')}>
                        <OutlinedText
                            text={'GO'}
                            fontSize={20}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily="Roboto-BlackItalic"
                            customStyle={{ textAlign: 'center', color: '#fff' }}
                        />
                    </ImageBackground>
                </View>
            </View>

        </View>
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
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    levelContainer: {
        backgroundColor: '#EBDFD7',
        width: '45%',
        borderRadius: 10,
        alignItems: 'center',
        padding: 15,
    },
    calender: {
        width: CALENDER_WIDTH,
        height: 312 * CALENDER_RATIO,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    centeredTextContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#CA7D10',
        textAlign: 'center',
        marginVertical: 10,
    },
    goBtn: {
        width: 75,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    coinBank: {
        width: COIN_BANK,
        height: 428 * COIN_BANK_RATIO,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});
export default StartGame;