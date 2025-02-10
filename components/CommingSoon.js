import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    ImageBackground,
    ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const BANNER_WIDTH = width * 0.80;
const BANNER_RATIO = BANNER_WIDTH / 1144;

const RES_BTN_WIDTH = width * 0.60;
const RES_BTN_RATIO = RES_BTN_WIDTH / 689.36;

export default function CommigSoon({ setclose }) {

    const press = (type) => {
        setclose(false)
    }

    return (
        <SafeAreaView style={styles.centeredView}>
            <View style={styles.mainContainer} showsVerticalScrollIndicator={false} scrollsToTop>
                <ImageBackground style={styles.banner} source={require('../assets/images/commingsoon.png')}>

                    <TouchableOpacity onPress={press}>
                        <Image style={styles.button} source={require('../assets/images/cs_btn.png')} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        width: '100%',
        height: '100%',
        backgroundColor: `rgba(0,0,0,0.5)`,
        position: 'absolute',
        zIndex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        width: '90%',
        maxHeight: '100%',
        backgroundColor: 'transparent',
        borderRadius: 20,
        flexDirection: 'column',
        padding: 15,
        paddingVertical: 25
    },
    banner: {
        width: BANNER_WIDTH,
        height: 1148 * BANNER_RATIO,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        width: RES_BTN_WIDTH,
        height: 174.84 * RES_BTN_RATIO,
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});