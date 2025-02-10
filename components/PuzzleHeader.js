import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PuzzleHeader({ setsettings, setibutton }) {
    return (
        <View style={style.container}>
            {/* <TouchableOpacity onPress={() => setsettings(true)}>
                <Image style={style.icon} source={require('../assets/images/setting.png')} />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => setibutton(true)}>
                <Image style={style.icon} source={require('../assets/images/i-button.png')} />
            </TouchableOpacity>
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        paddingBottom: 15
    },
    icon: {
        width: 30,
        height: 30
    }
});