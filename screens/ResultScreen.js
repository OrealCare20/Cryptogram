import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { get_async_data, set_async_data } from "../Helper/AppHelper";
import moment from "moment";
import analytics from '@react-native-firebase/analytics';

const { width } = Dimensions.get('screen');

const CLIPBOARD_WIDTH = width - 90;
const CLIPBOARD_RATIO = CLIPBOARD_WIDTH / 1109;

const BUTTON = width / 2;
const BUTTON_RATIO = BUTTON / 832;

export default function ResultScreen({ route, navigation }) {

    const [totalduration, settotalduration] = useState(null);
    const [level, setlevel] = useState(null);
    const [congrat, setcongrat] = useState(false);

    function formatCurrentTime() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    function getTimeDifference(currentTime, startTime) {
        const current = moment(currentTime, 'YYYY-MM-DD HH:mm:ss');
        const start = moment(startTime, 'YYYY-MM-DD HH:mm:ss');
        const duration = moment.duration(current.diff(start));

        const formattedTime = `${String(Math.floor(duration.asHours())).padStart(2, '0')}:` +
            `${String(duration.minutes()).padStart(2, '0')}:` +
            `${String(duration.seconds()).padStart(2, '0')}`;
        return formattedTime;
    }

    useEffect(() => {
        (async () => {
            let startTime = await get_async_data('start_time');
            let lvl = await get_async_data('round');
            // let phrase = route.params.quote;
            setlevel(parseInt(lvl.split('_')[1]) - 1);

            await analytics().logEvent('Result Screen');

            if (startTime != null || startTime != undefined) {
                let currentTime = formatCurrentTime();
                let duration = getTimeDifference(currentTime, startTime);

                let level_duration = await get_async_data('level_duration');
                if (level_duration != null && level_duration != undefined) {
                    // Ensure level_duration is an array
                    let newArray = Array.isArray(level_duration) ? [...level_duration, duration] : [duration];
                    await set_async_data('level_duration', newArray);
                } else {
                    await set_async_data('level_duration', [duration]);
                }

                settotalduration(duration);
            } else {
                console.log('bc time ni set howa')
            }
        })()
    }, []);

    useEffect(()=>{
        if(level == 16) {
            setcongrat(true);
        }
    },[level]);

    const next = async () => {
        await set_async_data('start_time', null);
        if(congrat) {
            navigation.navigate('Congratulation');
        } else{
            navigation.navigate('Home');
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.levelContainer}>
                <Text style={styles.currentlevel}>Level {level}</Text>
            </View>

            <View>
                <Image style={styles.clipboardClip} source={require('../assets/images/clipboard.png')} />
                <View style={styles.clipboard} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <ScrollView style={styles.clipboardTextArea}>
                        <Text style={styles.phrase}>{route.params.quote}</Text>
                    </ScrollView>

                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>Level Time {totalduration}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={next}>
                    <ImageBackground style={[styles.button, { marginTop: 40 }]} source={require('../assets/images/button.png')}>
                        <Text style={styles.btnText}>Next</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '95%', alignSelf: 'center', marginTop: 35 }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/dev?id=5809708760056578190&hl=en')} style={styles.iconContainer}>
                    <Image style={styles.icon} source={require('../assets/images/icons/share.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
                    <Image style={{ width: 61, height: 58.56 }} source={require('../assets/images/icons/home.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/dev?id=5809708760056578190&hl=en')} style={styles.iconContainer}>
                    <Image style={{ width: 50, height: 46.01 }} source={require('../assets/images/icons/like.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCDBE2'
    },
    levelContainer: {
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: '10%'
    },
    currentlevel: {
        color: '#482A00',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Roboto-Medium'
    },
    clipboard: {
        width: CLIPBOARD_WIDTH,
        minHeight: 1449 * CLIPBOARD_RATIO,
        maxHeight: 1449 * CLIPBOARD_RATIO,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 60,
        borderWidth: 14,
        borderColor: '#556071'
    },
    clipboardClip: {
        width: 88.84,
        height: 46.05,
        position: 'absolute',
        alignSelf: 'center',
        top: '4%',
        zIndex: 2
    },
    clipboardTextArea: {
        flex: 1,
        padding: 10,
        maxHeight: '80%'
    },
    phrase: {
        color: '#482A00',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 30
    },
    timeContainer: {
        backgroundColor: '#E1E1E1',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7
    },
    time: {
        color: '#482A00',
        fontSize: 20,
        fontFamily: 'Roboto-Regular'
    },
    button: {
        width: BUTTON,
        height: 304 * BUTTON_RATIO,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'Roboto-Bold',
        textShadowOffset: {
            width: -2,
            height: 1.5
        },
        textShadowColor: '#452900',
        textShadowRadius: 1
    },
    iconContainer: {
        width: '28%',
        paddingVertical: 17,
        backgroundColor: '#00CFC9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
    icon: {
        width: 58,
        height: 58
    }
});