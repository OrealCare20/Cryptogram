import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

// Constants for image and button dimensions
const IMG_WIDTH = width;
const IMG_RATIO = IMG_WIDTH / 1440; // Assuming 1440 is the original width of the background image
const BUTTON_WIDTH = width / 2;
const BUTTON_RATIO = BUTTON_WIDTH / 832; // Assuming 832 is the original width of the button image

const Congratulation = ({ navigation }) => {
    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={require('../assets/images/congrats.png')}
            resizeMode="cover" // Ensures the image covers the entire screen
        >
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.buttonContainer}
            >
                <ImageBackground
                    style={styles.buttonBackground}
                    source={require('../assets/images/button.png')}
                    resizeMode="contain" // Ensures the button image fits within the container
                >
                    <Text style={styles.buttonText}>Go To Home</Text>
                </ImageBackground>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Congratulation;

// Stylesheet for better organization
const styles = StyleSheet.create({
    backgroundImage: {
        width: IMG_WIDTH,
        height: 3200 * IMG_RATIO, // Adjust height based on the image ratio
        justifyContent: 'center', // Center the button vertically
        alignItems: 'center', // Center the button horizontally
    },
    buttonContainer: {
        width: BUTTON_WIDTH,
        height: 304 * BUTTON_RATIO, // Adjust height based on the button ratio
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'Roboto-Bold',
        textShadowOffset: { width: -2, height: 1.5 },
        textShadowColor: '#452900',
        textShadowRadius: 1,
    },
});