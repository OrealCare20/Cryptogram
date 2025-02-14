import { View, StyleSheet, Dimensions, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import GuidenceBox from './components/GuidenceBox';
import TourHeader from './components/TourHeader';
import { puzzleData } from '../../Helper/data';
import Keyboard from './components/Keyboard';
import { trigger } from "react-native-haptic-feedback";
import { BANNER_AD, options, set_async_data } from '../../Helper/AppHelper';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useNetInfo } from '@react-native-community/netinfo';

const { width, height } = Dimensions.get('screen');

const AppTour = ({ navigation }) => {
    const { type, isConnected } = useNetInfo();
    const [click, setclick] = useState(0); // HANDLE ** TAP TO CONTINUE TEXT **
    const [data, setData] = useState(puzzleData['Round1']); // puzzle sentence
    const [phrase, setPhrase] = useState(data); // puzzle sentence
    const [activeLetters, setActiveLetters] = useState([]); // contain all the missing letters of sentence
    const [letterpressed, setletterpressed] = useState(null); // pressed from keyboard
    const [correctletter, setcorrectletter] = useState(null); // correct letter for focused item
    const [focusId, setfocusId] = useState(null); // contains missing letter id/index to highlight it's BG
    const filterKeyboardKeys = () => {
        const letters = data.filter((item) => !item.show).map((item) => item.letter);
        setActiveLetters([...new Set(letters)]);
    };

    useEffect(() => {
        filterKeyboardKeys();
    }, [data]);

    useEffect(() => {
        (async () => {
            if (letterpressed) {
                if (letterpressed === correctletter) {
                    const updatedData = phrase.map(item =>
                        item.id === focusId ? { ...item, show: true } : item
                    );
                    let remainingCount = updatedData.filter(item => item.show == false).length;
                    setPhrase(updatedData);
                    setletterpressed(null);
                    setfocusId(null);
                    setcorrectletter(null);
                    filterKeyboardKeys();
                    changeIndex('next');

                    if (remainingCount == 0) {
                        await set_async_data('app_tour', 'passed');
                        navigation.navigate('Home');
                    }
                } else {
                    setletterpressed(null);
                    trigger("notificationError", options);
                }
            }
        })()
    }, [letterpressed]);

    const changeIndex = (index) => {
        const currentIndex = data.findIndex(item => item.id === focusId);
        let newIndex = currentIndex;

        if (index === 'prev' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (index === 'next' && currentIndex < data.length - 1) {
            newIndex = currentIndex + 1;
        }

        // Set focus to the next or previous item that is not shown
        while (newIndex >= 0 && newIndex < data.length && data[newIndex].show) {
            newIndex += (index === 'next' ? 1 : -1);
        }

        if (newIndex >= 0 && newIndex < data.length && !data[newIndex].show) {
            setfocusId(data[newIndex].id);
            setcorrectletter(data[newIndex].letter);
        }
    };

    const handlePress = (item) => {
        if (!item.show) { // Only handle press if the item is not already shown
            setfocusId(item.id);
            setcorrectletter(item.letter);
        }
    };

    const renderPuzzle = () => {
        let content = [];
        let currentWord = [];

        phrase.forEach((item, index) => {
            if (item.letter === '*') { // Handle space or special character as word separator
                if (currentWord.length > 0) {
                    content.push(
                        <View style={styles.wordContainer} key={`word-${index}`}>
                            {currentWord}
                        </View>
                    );
                    currentWord = [];
                }
                if (item.letter === '*') {
                    content.push(<View style={styles.blankSpace} key={`space-${index}`} />);
                }
            } else {
                const letterElement = (
                    <View onTouchEnd={() => { item.id == 3 && click == 1 ? setclick(prevClick => prevClick + 1) : null }} style={[{ width: 20, height: 50, justifyContent: 'center' }, focusId != null && focusId == item.id ? { backgroundColor: '#FFB002', borderRadius: 6 } : {}]} key={`letter-${index}`}>
                        <Text onPress={() => handlePress(item)} style={[getLetterStyle(item), { alignSelf: 'center', borderBottomWidth: 1.5, borderBottomColor: '#668899' }]}>
                            {item.show || (focusId === item.id && letterpressed) ? item.letter : ' '}
                        </Text>
                        <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 0, color: '#668899' }}>{item.number}</Text>
                        {/* pointer arrow shows here... */}
                        {item.id == 3 && click == 1 ? (<Image style={styles.pointingGif} source={require('../../assets/images/giphy.gif')} />) : null}
                    </View>
                );
                currentWord.push(letterElement);
            }
        });

        if (currentWord.length > 0) {
            content.push(
                <View style={styles.wordContainer} key="word-last">
                    {currentWord}
                </View>
            );
        }

        return content;
    };


    const getLetterStyle = (item) => ({
        ...styles.textInput,
        // backgroundColor: item.isHidden && focusId === item.id ? '#FFB002' : !item.isHidden ? 'transparent' : 'transparent',
        borderBottomColor: !item.show && focusId === item.id ? '#b37a00' : {},
        borderBottomWidth: !item.show && focusId === item.id ? 4 : 0,
        backgroundColor: !item.show && focusId === item.id ? '#FFB002' : item.show ? 'transparent' : 'transparent',
        textAlign: 'center',
    });

    useEffect(() => {
        // console.log(`click count : ${click}`);
        console.log(`Click count: ${click}`);
        if (click >= 2) {
            changeIndex('next');
        }
    }, [click]);

    return (
        <>
            <TourHeader />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.iButtonContainer}>
                    {/* <TouchableOpacity>
                        <Image style={styles.icon} source={require('../../assets/images/i-button.png')} />
                    </TouchableOpacity> */}
                </View>
                {renderPuzzle()}
                {click <= 2 && (<GuidenceBox click={click} setclick={setclick} />)}
            </ScrollView>

            {/* KEYBOARD ATERA */}
            <View style={styles.keyboardArea}>
                {click > 1 && (<Keyboard activeLetters={activeLetters} setletterpressed={setletterpressed} changeIndex={changeIndex} click={click} setclick={setclick} />)}
            </View>

            {isConnected ? (<View style={{ width: width, marginBottom: 5 }}>
                <BannerAd unitId={BANNER_AD} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} onAdLoaded={() => console.log(true)}
                    onAdFailedToLoad={(error) => console.error('Ad failed to load:', error)} />
            </View>) : (<View style={{ width: width }}></View>)}

            {/* MASK FOR HANDLING ** TAP LOGIC ** */}
            {click == 0 || click == 3 ? (<View onTouchEnd={() => setclick(prevClick => prevClick + 1)} style={styles.mask}></View>) : null}

        </>
    )
}
const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: `rgba(0,0,0,0.1)`
    },
    keyboardArea: {
        width: '100%',
        backgroundColor: '#F6E3DD',
        paddingVertical: 12,
        marginTop: 'auto'
    },
    puzzleArea: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 15,
        marginTop: 30
    },
    iButtonContainer: {
        width: '100%',
        alignItems: 'flex-end',
        paddingVertical: 10
    },
    icon: {
        width: 30,
        height: 30
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginRight: 10,
        marginBottom: 30, // Added margin to the bottom of each row
    },
    textInput: {
        height: 21,
        width: 20,
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderRadius: 6,
        lineHeight: 22,
        color: '#663c00'
    },
    blankSpace: {
        width: 10,
        height: 30,
    },
    pointingGif: {
        width: 20,
        height: 57,
        position: 'absolute',
        resizeMode: 'contain',
        bottom: '-75%',
        transform: [{ scale: 1.5 }]
    },
});
export default AppTour;