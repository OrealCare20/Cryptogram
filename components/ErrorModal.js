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

const BTN_WIDTH = width / 1.7;
const BTN_RATIO = BTN_WIDTH / 819;

const RES_BTN_WIDTH = width / 1.7;
const RES_BTN_RATIO = RES_BTN_WIDTH / 792;

export default function ErrorModal({ start_game }) {
    const [loader, setloader] = useState(false);

    const press = (type) => {
        setloader(true);
        start_game(type);
    }

    return (
        <SafeAreaView style={styles.centeredView}>
            <View style={styles.mainContainer} showsVerticalScrollIndicator={false} scrollsToTop>
                <Text style={styles.mistakesTitle}>You've made 3 mistakes</Text>

                <TouchableOpacity onPress={() => press('home')}>
                    <ImageBackground style={styles.btn} source={require('../assets/images/home_btn.png')}>
                        <View style={styles.package}>
                            <Text style={[styles.text, { color: '#F99A26' }]}>-3</Text>
                            <Image style={styles.gem} source={require('../assets/images/icons/gem.png')} />
                            <Text style={[styles.text, { color: '#ff0000', marginLeft: 7 }]}>-1</Text>
                            <Image style={[styles.coin, { marginLeft: 4 }]} source={require('../assets/images/OBJECTS.png')} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => press('restart')}>
                    <ImageBackground style={styles.btn} source={require('../assets/images/restart_btn.png')}>
                        <View style={styles.package}>
                            <Text style={[styles.text, { color: '#F99A26' }]}>-3</Text>
                            <Image style={styles.gem} source={require('../assets/images/icons/gem.png')} />
                            <Text style={[styles.text, { color: '#ff0000', marginLeft: 7 }]}>-1</Text>
                            <Image style={[styles.coin, { marginLeft: 4 }]} source={require('../assets/images/OBJECTS.png')} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => press('resume')}>
                    <Image style={styles.resbtn} source={require('../assets/images/resume.png')} />
                </TouchableOpacity>


            </View>
                {loader && (<View style={styles.loader}><ActivityIndicator size={'large'} color={'#cccccc'}/></View>)}
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
        backgroundColor: '#EEF3F5',
        borderRadius: 20,
        flexDirection: 'column',
        padding: 15,
        paddingVertical: 25
    },
    mistakesTitle: {
        textAlign: 'center',
        color: '#005E5B',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15
    },
    btn: {
        width: BTN_WIDTH,
        height: 247 * BTN_RATIO,
        alignSelf: 'center',
        marginTop: 30
    },
    resbtn: {
        width: RES_BTN_WIDTH,
        height: 216 * RES_BTN_RATIO,
        alignSelf: 'center',
        marginTop: 30
    },
    package: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#A26361',
        borderRadius: 6,
        width: '40%',
        alignSelf: 'center',
        position: 'absolute',
        top: -18,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    gem: {
        width: 10.16,
        height: 14.04,
        marginLeft: 3
    },
    coin: {
        width: 13.47,
        height: 13.99,
    },
    text: {
        fontSize: 14,
        fontWeight: '800',
        fontFamily: 'Inter_24pt-SemiBold'
    },
    loader: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        // top: 0,
        backgroundColor: `rgba(0,0,0,0.5)`,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});