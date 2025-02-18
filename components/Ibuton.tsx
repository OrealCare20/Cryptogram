import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('screen');

const Ibutton = ({ setibutton }: { setibutton: (value: boolean) => void }) => {

    const [currentIndex, setcurrentindex] = useState(0);
    const slides = [
        require('../assets/images/slide_1.png'),
        require('../assets/images/slide_2.png'),
        require('../assets/images/slide_3.png'),
    ];

    const close = () => {
        if (currentIndex == 2) {
            setibutton(false);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.mainArea}>
                <TouchableOpacity style={{ position: 'absolute', top: 0, zIndex: 4, right: 0 }} onPress={() => setibutton(false)}>
                    <Image source={require('../assets/images/close.png')} style={style.closeIcon} />
                </TouchableOpacity>
                <Carousel
                    loop
                    width={width * 0.8} // ✅ Adjust width to fit inside `mainArea`
                    height={width * 0.8} // ✅ Adjust height to fit inside `mainArea`
                    data={slides}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => setcurrentindex(index)}
                    renderItem={({ item }) => (
                        <Image source={item} style={style.image} />
                    )}
                    style={style.carousel} // ✅ Ensures it stays inside `mainArea`
                />
                {currentIndex! >= 2 ? (
                    <TouchableOpacity onPress={close} style={[style.button, { top: 10 }]}>
                        <Text style={style.buttonText}>{currentIndex == 2 ? 'Close' : 'Next'}</Text>
                    </TouchableOpacity>
                ) : (<View style={[style.button, { backgroundColor: 'transparent' }]}></View>)}
            </View>


        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: `rgba(0,0,0,0.7)`,
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainArea: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%', // ✅ Explicit width
        height: width * 0.9, // ✅ Explicit height
        paddingVertical: 20, // ✅ Adds space inside container
        borderRadius: 20,
    },
    carousel: {
        alignSelf: 'center', // ✅ Prevents stretching outside mainArea
    },
    image: {
        width: 280, // ✅ Ensures proper scaling
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    button: {
        width: '35%',
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#01A56B',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    closeIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: -10,
        top: -20
    },
});

export default Ibutton;
