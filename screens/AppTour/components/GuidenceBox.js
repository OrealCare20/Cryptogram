import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const GuidenceBox = ({ click, setclick }) => {
    const fadeAnim = useRef(new Animated.Value(1)).current; // Start with full opacity

    useEffect(() => {
        // Set up the animation to blink (fade in and fade out)
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,  // Fade out
                    duration: 700,  // Duration for fading out
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,  // Fade in
                    duration: 700,  // Duration for fading in
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start(); // Start the blinking animation

        // Clean up the animation when the component unmounts
        return () => blink.stop();
    }, [fadeAnim]);

    const showText = () => {
        let jsx = <></>
        if (click == 0) {
            jsx = (
                <>
                    <Text style={style.text}>A digit refers to a letter.</Text>
                    <Text style={style.text}>For Example , <Text style={style.bold}>19</Text> is <Text style={style.bold}>E</Text>.</Text>
                </>
            )
        }
        if (click == 1) {
            jsx = (
                <Text style={style.text}>Tap to choose a cell.</Text>
            )
        }
        if (click == 2) {
            jsx = (
                <Text style={style.text}>Choose a letter.</Text>
            )
        }
        // if (click == 3) {
        //     jsx = (
        //         <>
        //             <View style={{ backgroundColor: '#fff', padding: 5, width: 40, alignSelf: 'center' }}>
        //                 <Text style={[style.text, { color: '#01b274', fontWeight: '700' }]}>E</Text>
        //             </View>
        //             <Text style={[style.text, { fontSize: 18 }]}>A <Text style={{ color: '#01b274', fontWeight: '700' }}>green</Text> letter on the keyboard means there are more instances of the letter in the phrease .</Text>
        //         </>
        //     )
        // }
        // if (click == 4) {
        //     jsx = (
        //         <>
        //             <Text style={style.text}>Decrypt the whole phrase.</Text>
        //             <Text style={style.text}>Good luck!</Text>
        //         </>
        //     )
        // }
        return jsx;
    }

    return (
        <>
            <View style={style.container}>
                {showText()}
            </View>
            {
                click == 0 && (
                    <TouchableOpacity onPress={() => setclick(click + 1)}>
                        <Animated.Text style={[style.blinkingText, { opacity: fadeAnim }]}>Tap to continue.</Animated.Text>
                    </TouchableOpacity>
                )
            }
        </>
    )
}
const style = StyleSheet.create({
    container: {
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 20,
        backgroundColor: '#ffe6e6',
        borderWidth: 2,
        borderColor: '#ff8080',
        borderRadius: 8,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 28,
        fontFamily: 'Roboto-Regular',
        color: '#ff6666'
    },
    bold: {
        letterSpacing: 2,
        fontFamily: 'Roboto-Bold',
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    blinkingText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff8080', // You can change the color to any value
        textAlign: 'center',
        marginTop: 10
    },
})
export default GuidenceBox;