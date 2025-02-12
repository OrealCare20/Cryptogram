import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import Statistics from '../components/Statistics';
import Subscription from '../components/Subscription';
import { get_async_data, add_life, remaining_lifes, set_async_data, subtract_life, get_all_stats_data, get_best_time, COIN_REWARD } from '../Helper/AppHelper';
import * as Progress from 'react-native-progress';
import TabMenu from '../components/TabMenu';
import RewardedAd from '../Helper/AdManager/RewardedAd';
import LivesModel from '../components/LivesModel';
import CommigSoon from '../components/CommingSoon';
import SystemNavigationBar from 'react-native-system-navigation-bar';


const { width, height } = Dimensions.get('screen');

const CALENDER_WIDTH = width / 1.2;
const CALENDER_RATIO = CALENDER_WIDTH / 1216;

const BRAIN_WIDTH = width / 2.1;
const BRAIN_RATIO = BRAIN_WIDTH / 663;

const START_BUTTON = width / 2 + 20;
const START_BUTTON_RATIO = START_BUTTON / 816;

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
    const [completedpercent, setcompletedpercent] = useState(0);
    const [livemodel, setlivemodel] = useState(false);
    const [rewardad, setrewardad] = useState(false);
    const [lives, setlives] = useState('Full');
    const [data, setdata] = useState({ first_try_win: null, letter_solved: null, word_solved: null });

    SystemNavigationBar.immersive();


    useEffect(() => {
        (async () => {
            let stats_data = await get_all_stats_data();
            if (stats_data) {
                setdata(stats_data);
            }
            let round = await get_async_data('round');
            // console.log(round);
            let current_live = await get_async_data('remaining_lifes');
            if (round == null || round == undefined) {
                await set_async_data('round', 'round_1');
                setlevelcompleted('1');
            } else {
                let curr_lvl = parseInt(round.split('_')[1]) - 1;
                let compl_percnt = curr_lvl / 15;
                setlevelcompleted(round);
                setcompletedpercent(compl_percnt);
            }

            if (current_live >= 5) { setlives('Full') } else { setlives(current_live) }

        })()
    }, [levelcompleted]);

    const startGame = async () => {
        // if user have current lives > 1 then navigate else show Ad and then navigate
        let current_live = await get_async_data('remaining_lifes');
        let app_tour = await get_async_data('app_tour');
        // console.log(app_tour);
        if (current_live == 0) {
            console.log('showing popup bcuz current_live is 0');
            setlivemodel(true);
        } else {
            if(app_tour == null) {
                navigation.navigate('AppTour');
            } else{
                navigation.navigate('PlayGame');
                // navigation.navigate('TestScreen');
            }
        }
    }

    return (
        <>
            <SafeAreaView style={style.container}>
                <View style={{ width: '97%', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', top: '5%' }}>
                    <Image style={style.headerBadgeIcon} source={require('../assets/images/OBJECTS.png')} />
                    <View style={style.headerBadge}>
                        <Text style={style.headerText}>{lives}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setrewardad(true)}>
                        <Image style={{ width: 30, height: 30, marginLeft: 4 }} source={require('../assets/images/plus.png')} />
                    </TouchableOpacity>
                </View>

                <View style={style.mainContainer}>

                    <ImageBackground style={style.calender} source={require('../assets/images/cal.png')}>
                        <OutlinedText
                            text={'Daily Challenge'}
                            fontSize={20}
                            fontWeight={'500'}
                            shadowLine={3}
                            outlineColor={'#000'}
                            fontFamily='Supercell-Magic Regular'
                            customStyle={{ top: -20, color: '#fff', textShadowColor: '#000', textShadowRadius: 5 }}
                        />
                        <OutlinedText
                            text={`${levelcompleted.split('_')[1]} Level`}
                            fontSize={16}
                            outlineColor={'#000'}
                            shadowLine={1}
                            fontFamily='Supercell-Magic Regular'
                            customStyle={{ color: '#A26361', textShadowColor: '#19E6E1', textShadowRadius: 1, top: -5, marginBottom: 7 }}
                        />

                        <Text style={{ fontSize: 17, top: 10, textAlign: 'center', fontFamily: "Inter_24pt-SemiBold", fontWeight: '700' }}>Complete 15 level to Unlock</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', top: 30 }}>
                            <Progress.Bar progress={completedpercent} width={170} height={11} color='#FF9602' unfilledColor='#E9E3DC' borderWidth={0} borderRadius={7} />
                            <Text style={{ marginLeft: 15, fontSize: 18, fontFamily: 'Inter_24pt-SemiBold', letterSpacing: 1, fontWeight: '700', color: '#91403D' }}>{levelcompleted != undefined ? parseInt(levelcompleted.split('_')[1]) - 1 : 1}/16</Text>
                        </View>
                    </ImageBackground>
                </View>

                <TouchableOpacity onPress={startGame}>
                    <Image style={[style.startButton, { marginTop: '50%' }]} source={require('../assets/images/start.png')} />
                   
                </TouchableOpacity>


                <TabMenu
                    showstats={showstats}
                    setshowstats={setshowstats}
                    setshop={setshop}
                    shop={shop}
                />
            </SafeAreaView>

            
            {shop && (<CommigSoon setclose={setshop} />)}
            {showstats && (<Statistics setshowstats={setshowstats} levelcompleted={levelcompleted} data={data}/>)}
            {/* {shop && (<Subscription setshop={setshop} />)} */}
            {livemodel && (<LivesModel setlivemodel={setlivemodel} setrewardad={setrewardad} />)}
            {rewardad && (<RewardedAd adId={COIN_REWARD} setrewardad={setrewardad} adPurpose={'adLive'} navigation={navigation} setlivemodel={setlivemodel} />)}
        </>

    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#CCDBE2',
        paddingHorizontal: 10,
        paddingVertical: 0
    },
    headerBadge: { width: 53, height: 32, backgroundColor: '#E7D2C6', borderRadius: 7, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 10, marginLeft: '5%' },
    headerText: { color: '#BE8763', fontSize: 12, fontWeight: '700', fontFamily: 'Inter_24pt-SemiBold' },
    headerBadgeIcon: {
        width: 34,
        height: 34,
        position: 'absolute',
        zIndex: 1
    },
    mainContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: '18%'
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
        height: 844 * CALENDER_RATIO,
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
        height: 304 * START_BUTTON_RATIO,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointingGif: {
        width: 40,
        height: 87,
        resizeMode: 'contain',
        position: 'absolute',
        right: '9%',
        bottom: '-5%',
        transform: [{ scale: 4 }]
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center'
    },

    textContainer: {
        position: 'relative',
        display: 'none'
    },
    text: {
        fontSize: 40,
        color: 'white', // Main text color
        fontWeight: 'bold',
        position: 'absolute',
    },
    stroke: {
        color: 'black', // Stroke color
    },
});
export default Home;