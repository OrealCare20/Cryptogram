import { View, StyleSheet, Dimensions, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import GuidenceBox from './components/GuidenceBox';
import TourHeader from './components/TourHeader';
import { puzzleData } from '../../Helper/data';
import Keyboard from './components/Keyboard';
import { trigger } from "react-native-haptic-feedback";
import { BANNER_AD, options, set_async_data } from '../../Helper/AppHelper';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const { width, height } = Dimensions.get('screen');

const AppTour = ({ navigation }) => {
    const [click, setclick] = useState(0); // HANDLE ** TAP TO CONTINUE TEXT **
    const [data, setData] = useState(puzzleData['Round1']); // puzzle sentence
    const [phrase, setPhrase] = useState(data); // puzzle sentence
    const [activeLetters, setActiveLetters] = useState([]); // contain all the missing letters of sentence
    const [letterpressed, setletterpressed] = useState(null); // pressed from keyboard
    const [correctletter, setcorrectletter] = useState(null); // correct letter for focused item
    const [focusId, setfocusId] = useState(null); // contains missing letter id/index to highlight it's BG
    const filterKeyboardKeys = () => {
        const letters = data.filter((item) => item.isHidden).map((item) => item.alphabet);
        setActiveLetters([...new Set(letters)]);
    };
    SystemNavigationBar.immersive();

    useEffect(() => {
        filterKeyboardKeys();
    }, [data]);

    useEffect(() => {
        (async () => {
            if (letterpressed) {
                if (letterpressed === correctletter.alphabet) {
                    const updatedData = phrase.map(item =>
                        item.id === focusId ? { ...item, isHidden: false } : item
                    );
                    let remainingCount = updatedData.filter(item => item.isHidden).length;
                    console.log(`remainingCount ${remainingCount}`)
                    setPhrase(updatedData);
                    setletterpressed(null);
                    setfocusId(null);
                    setcorrectletter(null);
                    filterKeyboardKeys();
                    changeIndex('next');

                    if (remainingCount == 5) {
                        await set_async_data('app_tour', 'passed');
                        navigation.navigate('Home');
                    }
                } else {
                    setletterpressed(null);
                    trigger("notificationError", options);
                }
            } else {
                console.log(`correctletter ${correctletter} letterpressed ${letterpressed}`)
            }
        })()
    }, [letterpressed]);

    const changeIndex = (index) => {
        const currentIndex = phrase.findIndex(item => item.id === focusId);

        let newIndex = currentIndex;

        if (index === 'prev' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (index === 'next' && currentIndex < phrase.length - 1) {
            newIndex = currentIndex + 1;
        }

        // Adjust the while loop to skip over locked or visible items.
        while (newIndex >= 0 && newIndex < phrase.length && (!phrase[newIndex].isHidden || phrase[newIndex].isSingleLocked)) {
            if (index === 'next') {
                newIndex += 1; // Move forward when going to the next index
            } else if (index === 'prev') {
                newIndex -= 1; // Move backward when going to the previous index
            }
        }

        // Check if the newIndex is still valid and focusable (hidden and not locked)
        if (newIndex >= 0 && newIndex < phrase.length && phrase[newIndex].isHidden && !phrase[newIndex].isSingleLocked) {
            setfocusId(phrase[newIndex].id);
            setcorrectletter(phrase[newIndex]);
        }
    };

    const handlePress = (item) => {
        console.log(`ITEM ${JSON.stringify(item)}`)
        setletterpressed(null);
        if (item.isHidden && !item.isSingleLocked && !item.isDoubleLocked) { // Only handle press if the item is not already shown
            setfocusId(item.id);
            setcorrectletter(item);
        }
    };

    const renderPuzzle = () => {
        let content = [];
        let currentWord = [];
        phrase.forEach((item, index) => {
            let hintStyle = {}
            let isDoubleLocked = item.isDoubleLocked;
            let isSingleLocked = item.isSingleLocked;

            // if (enableHint && item.isHidden && !item.isSingleLocked) {
            //     hintStyle = { borderWidth: 2, borderColor: '#01A56B', borderRadius: 8 };
            // }

            if (item.alphabet == ' ' || item.number == 0) { // Handle space or special character as word separator
                if (currentWord.length > 0) {
                    content.push(
                        <View style={[styles.wordContainer]} key={`word-${index}`}>
                            {currentWord}
                        </View>
                    );
                    currentWord = [];
                }
                if (item.alphabet === ' ') {
                    content.push(<View style={[{ width: 20, height: 30 }]} key={`space-${index}`}></View>);
                }
            } else {
                let letterElement = <></>
                if (item.number == -1) {
                    letterElement = (
                        <View style={[styles.wordContainer]} key={`letter-${index}`}>
                            <Text style={[getLetterStyle(item), { alignSelf: 'center' }]}>
                                {item.alphabet}
                            </Text>
                            <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 5, color: '#482A00' }}></Text>
                        </View>
                    );
                } else if (item.number == -3) {
                    letterElement = (
                        <View style={[{ width: 20, height: 55, justifyContent: 'center' }, hintStyle]} key={`letter-${index}`}>
                            <Text style={[getLetterStyle(item), { alignSelf: 'center', borderBottomWidth: 1.5, borderBottomColor: '#668899' }]}>
                                {item.alphabet}
                            </Text>
                            <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 5, color: '#482A00' }}></Text>
                        </View>
                    );
                } else {
                    letterElement = (
                        <View style={[{ width: 20, height: 50, justifyContent: 'center' }, hintStyle, focusId != null && focusId == item.id ? { backgroundColor: '#FFB002', borderRadius: 6 } : {}]} key={`letter-${index}`}>
                            {/* {handleLocks(item)} */}
                            {item.isKey && (<Image style={{ width: 11, height: 20, position: 'absolute', zIndex: 3, top: '-40%', alignSelf: 'center' }} source={require('../../assets/images/icons/star.png')} />)}
                            {isSingleLocked ? (<View onPress={() => handlePress(item)} style={[getLetterStyle(item), { alignSelf: 'center', backgroundColor: 'transparent' }]}><Image style={{ width: 15, height: 24, position: 'absolute', zIndex: 3, top: 10, alignSelf: 'center' }} source={item.isDoubleLocked ? require('../../assets/images/icons/lock.png') : require('../../assets/images/icons/locked.png')} /></View>) : (
                                <Text onPress={() => handlePress(item)} style={[getLetterStyle(item), { alignSelf: 'center', borderBottomWidth: 1.5, borderBottomColor: '#668899' }]}>
                                    {!item.isHidden ? item.alphabet : ' '}
                                </Text>
                            )}
                            {(item.isSingleLocked) ? (<Text style={{ fontSize: 13, textAlign: 'center', marginTop: 0 }}></Text>) : (<Text style={[correctletter && correctletter.id == item.id ? { fontWeight: '700', fontSize: 11 } : {}, { fontSize: 13, textAlign: 'center', margin: 0, color: '#668899' }]}>{item.number}</Text>)}
                        </View>
                    );
                    // hintStyle = {}
                }
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
        borderBottomColor: item.isHidden && focusId === item.id ? '#b37a00' : {},
        borderBottomWidth: item.isHidden && focusId === item.id ? 4 : 0,
        textAlign: 'center',
    });

    useEffect(() => {
        if (click == 2) { changeIndex('next') }
    }, [click]);

    return (
        <>
            <TourHeader />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* <View style={styles.iButtonContainer}>
                    <TouchableOpacity>
                        <Image style={styles.icon} source={require('../../assets/images/i-button.png')} />
                    </TouchableOpacity>
                </View> */}
                {renderPuzzle()}
                {click < 5 && (<GuidenceBox click={click} setclick={setclick} />)}
            </ScrollView>

            {/* KEYBOARD ATERA */}
            <View style={styles.keyboardArea}>
                {click > 0 && (<Keyboard activeLetters={activeLetters} setletterpressed={setletterpressed} changeIndex={changeIndex} click={click} setclick={setclick} />)}
            </View>

            <View style={{ width: width }}>
                <BannerAd unitId={BANNER_AD} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} onAdLoaded={() => console.log(true)}
                    onAdFailedToLoad={(error) => console.error('Ad failed to load:', error)} />
            </View>

            {/* MASK FOR HANDLING ** TAP LOGIC ** */}
            {click == 0 || click == 3 ? (<View onTouchEnd={() => setclick(click + 1)} style={styles.mask}></View>) : null}

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
        width: width,
        backgroundColor: '#F6E3DD',
        paddingBottom: 12,
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
        resizeMode: 'contain',
        bottom: '14%',
        transform: [{ scale: 2 }]
    },
});
export default AppTour;