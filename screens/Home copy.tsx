import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import Statistics from '../components/Statistics';
import Subscription from '../components/Subscription';
import { get_async_data, playSound, set_async_data } from '../Helper/AppHelper';

const { width, height } = Dimensions.get('screen');

const CALENDER_WIDTH = width / 3 - 50;
const CALENDER_RATIO = CALENDER_WIDTH / 288;

const BRAIN_WIDTH = width / 2 - 25;
const BRAIN_RATIO = BRAIN_WIDTH / 663;

const START_BUTTON = width / 2;
const START_BUTTON_RATIO = START_BUTTON / 353;

const COIN_BANK = width / 2 - 80;
const COIN_BANK_RATIO = COIN_BANK / 427;

const SHOP_ICON_WIDTH = width / 3 - 80;
const SHOP_ICON_RATIO = SHOP_ICON_WIDTH / 217;

const STAT_ICON_WIDTH = width / 3 - 80;
const STAT_ICON_RATIO = STAT_ICON_WIDTH / 233;

const COLL_ICON_WIDTH = width / 3 - 80;
const COLL_ICON_RATIO = COLL_ICON_WIDTH / 237;

const GO_BTN_WIDTH = width / 6;
const GO_BTN_RATIO = GO_BTN_WIDTH / 324;


const Home = ({ navigation }: { navigation: any }) => {
    const [levelcompleted, setlevelcompleted] = useState('0');
    const [showstats, setshowstats] = useState(false);
    const [shop, setshop] = useState(false);

    useEffect(()=>{
        (async ()=>{
            let round = await get_async_data('round');
            if(round == null ) {
                await set_async_data('round', 'round_1');
            } else{
                console.log('enter game from round ',round)
                setlevelcompleted(round);
            }
        })()
    },[]);

    return (
        <>
            <SafeAreaView style={style.container}>
                <View style={{ width: '97%', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
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
                            fontSize={12.22}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily="Supercell-Magic Regular"
                            customStyle={{ marginVertical: 5 }}
                        />

                        <ImageBackground style={style.calender} source={require('../assets/images/cal.png')}>
                            <OutlinedText
                                text={'15'}
                                fontSize={11.22}
                                outlineColor={'#000'}
                                shadowLine={2}
                                fontFamily="Supercell-Magic Regular"
                                customStyle={{ marginTop: 15, textAlign: 'center' }}
                            />
                            <OutlinedText
                                text={'Level'}
                                fontSize={11.22}
                                outlineColor={'#000'}
                                shadowLine={2}
                                fontFamily="Supercell-Magic Regular"
                                customStyle={{ marginTop: 0, textAlign: 'center' }}
                            />
                        </ImageBackground>

                        <View style={style.centeredTextContainer}>
                            <OutlinedText
                                text={'Complete 15 Level to Unlock'}
                                fontSize={11.22}
                                outlineColor={'#000'}
                                color="#FFB002"
                                shadowLine={2}
                                fontFamily="Supercell-Magic Regular"
                                customStyle={{ textAlign: 'center', alignSelf: 'center', marginTop: 7 }}
                            />
                        </View>
                    </View>

                    {/* Event Section */}
                    {/* <View style={[style.levelContainer, { backgroundColor: '#fff', borderColor: '#000', borderWidth: 3 }]}>
                        <View style={style.duration}>
                            <Text style={style.durationText}>22d 15h</Text>
                        </View>
                        <OutlinedText
                            text={'Event'}
                            fontSize={11.22}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily="Supercell-Magic Regular"
                            customStyle={{ textAlign: 'center' }}
                        />
                        <Image
                            style={style.coinBank}
                            source={require('../assets/images/coin-bank.png')}
                        />
                        <Text style={style.progress}>Progress: 7/120</Text>

                        <ImageBackground style={style.goBtn} source={require('../assets/images/go.png')}>
                            <OutlinedText
                                text={'GO'}
                                fontSize={8}
                                fontWeight={'500'}
                                outlineColor={'#000'}
                                shadowLine={2}
                                fontFamily="Supercell-Magic Regular"
                                customStyle={{ textAlign: 'center', color: '#fff' }}
                            />
                        </ImageBackground>
                    </View> */}
                </View>

                <Image style={style.brain} source={require('../assets/images/brain.png')} />

                <TouchableOpacity onPress={() => navigation.navigate('PlayGame')}>
                    <ImageBackground style={style.startButton} source={require('../assets/images/button.png')}>
                        <Image source={require('../assets/images/play-icon.png')} style={{ width: 20, height: 24.9, left: '-4%' }} />
                        <OutlinedText
                            text={'Start'}
                            fontSize={26}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily='Supercell-Magic Regular'
                        />
                    </ImageBackground>
                    <Image style={style.pointingGif} source={require('../assets/images/pointing.gif')} />
                </TouchableOpacity>

                <View style={style.optionContainer}>
                    <TouchableOpacity onPress={() => setshop(true)} style={style.column}>
                        <Image style={{ width: SHOP_ICON_WIDTH, height: 228 * SHOP_ICON_RATIO, alignSelf: 'center' }} source={require('../assets/images/shop.png')} />
                        <OutlinedText
                            text={'Shop'}
                            fontSize={10}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1.5}
                            fontFamily="Supercell-Magic Regular"
                            customStyle={{ marginTop: 5, textAlign: 'center' }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setshowstats(true)} style={style.column}>
                        <Image style={{ width: STAT_ICON_WIDTH, height: 228 * STAT_ICON_RATIO, alignSelf: 'center' }} source={require('../assets/images/statistics.png')} />
                        <OutlinedText
                            text={'Statistics'}
                            fontSize={10}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1.5}
                            fontFamily="Supercell-Magic Regular"
                            customStyle={{ marginTop: 5, textAlign: 'center' }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.column}>
                        <Image style={{ width: COLL_ICON_WIDTH, height: 228 * COLL_ICON_RATIO, alignSelf: 'center' }} source={require('../assets/images/collection.png')} />
                        <OutlinedText
                            text={'Collection'}
                            fontSize={10}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1.5}
                            fontFamily="Supercell-Magic Regular"
                            customStyle={{ marginTop: 5, textAlign: 'center' }}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {showstats && (<Statistics setshowstats={setshowstats} levelcompleted={levelcompleted} />)}
            {shop && (<Subscription setshop={setshop} />)}
        </>

    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#F7F2EF',
        paddingHorizontal: 10,
        paddingVertical: 0
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
        marginTop: 30,
        paddingHorizontal: 10
    },
    levelContainer: {
        backgroundColor: '#EBDFD7',
        width: '45%',
        height: 'auto',
        borderRadius: 11.81,
        alignItems: 'center',
        padding: 15,
    },
    duration: {
        position: 'absolute',
        top: -15,
        backgroundColor: '#0069F2',
        borderRadius: 5.73,
        paddingHorizontal: 5,
        paddingVertical: 3
    },
    durationText: {
        fontSize: 10.99,
        fontWeight: '600',
        color: '#fff'
    },
    calender: {
        width: CALENDER_WIDTH,
        height: 312 * CALENDER_RATIO,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    centeredTextContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#CA7D10',
        textAlign: 'center',
        marginBottom: 10,
    },
    goBtn: {
        width: GO_BTN_WIDTH,
        height: 128 * GO_BTN_RATIO,
        justifyContent: 'center',
        alignItems: 'center'
    },
    coinBank: {
        width: COIN_BANK,
        height: 428 * COIN_BANK_RATIO,
        resizeMode: 'contain',
    },
    brain: {
        width: BRAIN_WIDTH,
        height: 477 * BRAIN_RATIO,
        alignSelf: 'center',
        marginTop: 60
    },
    startButton: {
        width: START_BUTTON,
        height: 133 * START_BUTTON_RATIO,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    pointingGif: {
        width: 40,
        height: 87,
        resizeMode: 'contain',
        position: 'absolute',
        right: '9%',
        bottom: '-5%',
        transform: [{scale: 4}]
    },
    optionContainer: {
        width: width * 0.77,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        marginTop: 50
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
export default Home;