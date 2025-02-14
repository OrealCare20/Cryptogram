import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import OutlinedText from '@kdn0325/react-native-outlined-text';
import PulseLoader from "./PulseLoader";


export default function LivesModel({ setlivemodel, setearncoin }) {
    const [loader, setloader] = useState(false);

    const watch_ad = () => {
        setloader(prevState => !prevState);
        setearncoin(prevState => !prevState);
    }

    return (
        <SafeAreaView style={styles.centeredView}>
            <View style={styles.mainContainer} showsVerticalScrollIndicator={false} scrollsToTop>
                <TouchableOpacity onPress={() => { setlivemodel(false) } }>
                    <Image source={require('../assets/images/close.png')} style={styles.closeIcon} />
                </TouchableOpacity>
                <Text style={styles.mistakesTitle}>Need more Lives ?</Text>

                <Image style={{ width: 121, height: 97, alignSelf: 'center' }} source={require('../assets/images/icons/add_live.png')} />
                {
                    loader == false ? (
                        <TouchableOpacity style={[styles.startButton, { marginTop: '5%' }]} onPress={() => watch_ad()}>
                            <Image style={{ width: 21, height: 24.6, marginRight: 10 }} source={require('../assets/images/icons/Vector.png')} />
                            <Text style={styles.btnText}>Watch Ad</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={{ marginTop: '5%' }}>
                            <PulseLoader />
                        </View>
                    )
                }
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
        backgroundColor: '#EEF3F5',
        borderRadius: 20,
        flexDirection: 'column',
        padding: 15,
        paddingVertical: 25
    },
    mistakesTitle: {
        textAlign: 'center',
        color: '#482A00',
        fontSize: 23,
        fontWeight: '700',
        marginBottom: 15
    },
    startButton: {
        width: 194,
        height: 50,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC545',
        borderRadius: 8
    },
    closeIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: -10,
        top: -20
    },
    btnText: {
        color: '#482A00',
        fontSize: 26,
        fontWeight: '600',
        fontFamily: 'Inter_24pt-SemiBold'
    }
});