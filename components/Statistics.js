import OutlinedText from "@kdn0325/react-native-outlined-text";
import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
import { get_best_time, get_average_time } from "../Helper/AppHelper";
const { width, height } = Dimensions.get('screen');

const OPT_WIDTH = width * 0.88;
const OPT_RATIO = OPT_WIDTH / 1312;

export default function Statistics({ setshowstats, levelcompleted, data }) {

   
    return (
        <View style={style.container}>
            <View style={style.mainContainer} showsVerticalScrollIndicator={false} scrollsToTop>
                <View style={style.header}>
                    <View style={{ width: '40%', backgroundColor: '#FFC545', top: '-30%', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 6, marginLeft: '31%', borderColor: '#000', borderWidth: 1 }}>
                        <OutlinedText
                            text={'Statistic'}
                            fontSize={18}
                            // fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1}
                            fontFamily='Supercell-Magic Regular'
                            customStyle={{ color: '#fff' }}
                        />
                    </View>

                    <TouchableOpacity onPress={() => setshowstats(false)} style={style.closeBtn}>
                        <Image style={style.close} source={require('../assets/images/close.png')} />
                    </TouchableOpacity>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={style.mainArea}>
                        <Text style={style.heading}>Summary</Text>
                        <View style={{ paddingBottom: 50 }}>
                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/level-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Level Completed</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{levelcompleted != null && (levelcompleted.split('_')[1] - 1)}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/first-try-win.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>First Try Win</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.first_try_win != null ? data.first_try_win : 0}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/word-solved.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Word Solved</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.word_solved != null ? data.word_solved : 0}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/letter-solved.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Letters Solved</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.letter_solved != null ? data.letter_solved : 0}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/days-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Days Completed</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.days_completed != null && data.days_completed > 0 ? data.days_completed : 0}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/month-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Months Completed</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.days_completed!= null && data.days_completed > 28 ? 1: 0}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/best-time.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Best Time</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.level_durations != null ? get_best_time(data.level_durations): '00:00:00'}</Text>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={style.optionRow} source={require('../assets/images/gradient_opt.png')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/average-time.png')} />
                                    <Text style={[style.optText, { fontSize: 15, marginLeft: 8 }]}>Average Time</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={style.optText}>{data.level_durations != null ? get_average_time(data.level_durations) : '00:00:00'}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: `rgba(0,0,0,0.5)`,
        position: 'absolute',
        zIndex: 1
    },
    mainContainer: {
        width: width,
        maxHeight: '98%',
        backgroundColor: '#CCDBE2',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        // flexDirection: 'column',
        marginTop: 'auto',
        paddingBottom: 20
    },
    // header: {
    //     width: width,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 29,
        fontWeight: '700',
        textShadowColor: '#fff',
        textShadowRadius: 1,
        textShadowOffset: {
            width: -2,
            height: 2,
        },
        color: '#482A00',
        fontFamily: 'oktah_round_light-BF6407f0ed773d3',
        // marginLeft: 'auto',
        marginTop: 15,
    },
    closeBtn: {
        marginLeft: 'auto',
        marginRight: '3%',
        top: '-50%'
    },
    close: {
        width: 33.4,
        height: 33.4
    },
    mainArea: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15
    },
    heading: {
        color: '#482A00',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 15
    },
    // optionContainer: {
    //     width: '100%',
    //     backgroundColor: '#fff',
    //     borderRadius: 8,
    //     padding: 10,
    //     marginTop: 10
    // },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: OPT_WIDTH,
        height: 160 * OPT_RATIO,
        marginBottom: 9,
        alignSelf: 'center',
        paddingRight: 5
    },
    icon: {
        width: 24,
        height: 24
    },
    optText: {
        color: '#130E07',
        fontSize: 15,
        fontWeight: '700'
    }
});