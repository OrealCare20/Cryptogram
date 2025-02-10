import OutlinedText from "@kdn0325/react-native-outlined-text";
import React, {useState} from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, ScrollView, Switch } from "react-native";
const { width, height } = Dimensions.get('screen');

const OPT_WIDTH = width * 0.88;
const OPT_RATIO = OPT_WIDTH / 1312;

export default function Settings({setsettings}) {
    const [enableNotification, setenableNotification] = useState(false);
    const [enableVibration, setenableVibration] = useState(true);

    return (
        <View style={style.container}>
            <View style={style.mainContainer} showsVerticalScrollIndicator={false} scrollsToTop>
                <View style={style.header}>
                    <View style={{ width: '41%', paddingHorizontal: 8, marginLeft: '31%' }}>
                        <Text numberOfLines={1} style={style.title}>SETTINGS</Text>
                    </View>

                    <TouchableOpacity style={style.closeBtn} onPress={()=>setsettings(false)}>
                        <Image style={style.close} source={require('../assets/images/close.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={style.buttonBox}>
                        <Image style={style.icon} source={require('../assets/images/icons/contact_us.png')} />
                        <Text style={style.text}>Contact Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.buttonBox}>
                        <Image style={style.icon} source={require('../assets/images/icons/remove_ads.png')} />
                        <Text style={style.text}>Ads</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.buttonBox}>
                        <Image style={style.icon} source={require('../assets/images/icons/restore_purchase.png')} />
                        <Text style={style.text}>Restore {'\n'}Purchase</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.buttonBox}>
                        <Image style={style.icon} source={require('../assets/images/icons/promocode.png')} />
                        <Text style={style.text}>Promo Code</Text>
                    </TouchableOpacity>
                </View>


                <View style={style.advancedSetting}>
                    <View style={style.optionRow}>
                        <Text style={[style.text, { fontSize: 16 }]}>Notifications</Text>
                        <Switch
                            trackColor={{ false: '#B6C6C5', true: '#39C15C' }}
                            thumbColor={'#fff'}
                            ios_backgroundColor="#B6C6C5"
                            onValueChange={()=>setenableNotification(!enableNotification)}
                            value={enableNotification}
                        />
                    </View>

                    <View style={style.optionRow}>
                        <Text style={[style.text, { fontSize: 16 }]}>Vibration</Text>
                        <Switch
                            trackColor={{ false: '#B6C6C5', true: '#39C15C' }}
                            thumbColor={'#fff'}
                            ios_backgroundColor="#B6C6C5"
                            onValueChange={()=>setenableVibration(!enableVibration)}
                            value={enableVibration}
                        />
                    </View>

                    <View style={style.optionRow}>
                        <Text style={[style.text, { fontSize: 16 }]}>Language</Text>
                        <View style={style.language}>
                            <Text style={{fontSize: 13, fontWeight: '700', fontFamily: 'Inter_24pt-SemiBold'}}>English</Text>
                        </View>
                    </View>
                </View>

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
        zIndex: 3
    },
    mainContainer: {
        width: width,
        maxHeight: '98%',
        backgroundColor: '#F7F2EF',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        paddingHorizontal: 15,
        marginTop: 'auto',
        paddingBottom: 50
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#482A00',
        fontFamily: 'oktah_round_light-BF6407f0ed773d3',
        fontSize: 29,
        textAlign: 'center',
        fontWeight: '700',
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 2,
        marginVertical: 20
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
    buttonBox: {
        width: width * 0.22,
        height: width * 0.18,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 10
    },
    icon: {
        width: 23,
        height: 23
    },
    text: {
        color: '#130E07',
        fontSize: 10,
        fontWeight: '700',
        textAlign: 'center'
    },
    advancedSetting: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: OPT_WIDTH,
        height: 160 * OPT_RATIO,
        marginBottom: 15,
        alignSelf: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#CCDBE2',
        borderRadius: 50
    },
    language: {
        backgroundColor: '#8ACDED',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50
    }
});