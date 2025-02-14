import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { useNetInfo } from "@react-native-community/netinfo";
import { trigger } from "react-native-haptic-feedback";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AlphabetKeyboard from '../components/AlphabetKeyboard';
import { puzzleData } from '../Helper/dataOriginal';
import PlayGameHeader from '../components/PlayGameHeader';
import ErrorModal from '../components/ErrorModal';
import { get_async_data, get_total_time, incrementValue, options, subtract_life, set_async_data, concatenateAlphabets, letter_solved, first_try_win, word_solved, getUnusedVisibleLetters, getRepeatedHiddenAlphabets, BANNER_AD, COIN_REWARD, RESUME_REWARD, HINT_REWARD, add_life } from '../Helper/AppHelper';
import PuzzleHeader from '../components/PuzzleHeader';
import Settings from '../components/Settings';
import moment from 'moment';
import RewardedAd from '../Helper/AdManager/RewardedAd';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import HintRewardedAd from '../Helper/AdManager/HintRewardedAd';
import Ibutton from '../components/Ibuton';
import CommigSoon from '../components/CommingSoon';
import LivesModel from '../components/LivesModel';
import CoinReward from '../Helper/AdManager/CoinReward';
import ResumeReward from '../Helper/AdManager/ResumeReward';

const { width, height } = Dimensions.get('screen');

const intitialRows = [
    [
        { letter: 'Q', isActive: true, isRepeating: false },
        { letter: 'W', isActive: true, isRepeating: false },
        { letter: 'E', isActive: true, isRepeating: false },
        { letter: 'R', isActive: true, isRepeating: false },
        { letter: 'T', isActive: true, isRepeating: false },
        { letter: 'Y', isActive: true, isRepeating: false },
        { letter: 'U', isActive: true, isRepeating: false },
        { letter: 'I', isActive: true, isRepeating: false },
        { letter: 'O', isActive: true, isRepeating: false },
        { letter: 'P', isActive: true, isRepeating: false }
    ],
    [
        { letter: 'A', isActive: true, isRepeating: false },
        { letter: 'S', isActive: true, isRepeating: false },
        { letter: 'D', isActive: true, isRepeating: false },
        { letter: 'F', isActive: true, isRepeating: false },
        { letter: 'G', isActive: true, isRepeating: false },
        { letter: 'H', isActive: true, isRepeating: false },
        { letter: 'J', isActive: true, isRepeating: false },
        { letter: 'K', isActive: true, isRepeating: false },
        { letter: 'L', isActive: true, isRepeating: false }
    ],
    [
        { letter: 'nav1', isActive: true, isRepeating: false },
        { letter: 'Z', isActive: true, isRepeating: false },
        { letter: 'X', isActive: true, isRepeating: false },
        { letter: 'C', isActive: true, isRepeating: false },
        { letter: 'V', isActive: true, isRepeating: false },
        { letter: 'B', isActive: true, isRepeating: false },
        { letter: 'N', isActive: true, isRepeating: false },
        { letter: 'M', isActive: true, isRepeating: false },
        { letter: 'nav2', isActive: true, isRepeating: false },
    ]
];

// numbers should be hidden under the lock word

export default function PlayGame({ navigation }) {
    const { type, isConnected } = useNetInfo();
    const [round, setRound] = useState('round_1'); // game round
    const [data, setData] = useState(puzzleData[round]); // puzzle sentence
    const [phrase, setPhrase] = useState(data); // puzzle sentence
    const [mistake, setmistake] = useState(0); // mistake count
    const [activeLetters, setActiveLetters] = useState([]); // contain all the missing letters of sentence
    const [letterpressed, setletterpressed] = useState(null); // pressed from keyboard
    const [correctletter, setcorrectletter] = useState(null); // correct letter for focused item
    const [focusId, setfocusId] = useState(null); // contains missing letter id/index to highlight it's BG
    const [errorModal, seterrorModal] = useState(false);
    const [settings, setsettings] = useState(false);
    const [enableHint, setenableHint] = useState(false);
    const [letterOccur, seteletterOccur] = useState(null);
    const [rows, setRows] = useState(intitialRows);
    const [resumerewardad, setresumerewardad] = useState(false);
    const [livemodel, setlivemodel] = useState(false);
    const [earncoin, setearncoin] = useState(false);
    const [hintAd, sethintAd] = useState(false);
    const [availableHints, setavailableHints] = useState(null);
    const [firsttry, setfirsttry] = useState(true);
    const [restart, setrestart] = useState(false);
    const [ibutton, setibutton] = useState(false);
    const [totalcoin, settotalcoin] = useState(5);

    SystemNavigationBar.immersive();

    useEffect(() => {
        // console.log('RESTART USEEFFECT CALLED -> VALUE IS : ', restart);
        (async () => {
            if (restart == false) {
                const fetchRoundData = async () => {
                    // console.log(data.length)
                    let current_time = moment().format('YYYY-MM-DD HH:mm:ss');
                    await set_async_data('start_time', current_time);
                    let round = await get_async_data('round');
                    setRound(round); // update round state

                    let hint = await get_async_data('hints');
                    // console.log('available HINTS ', hint)
                    if (hint != null || hint != undefined) {
                        setavailableHints(hint)
                    }
                };
                setPhrase(data);
                setmistake(0);
                sethintAd(false);
                setletterpressed(null);
                await fetchRoundData();

            }
        })()
    }, [restart]);

    // Fetch round and update phrase when round changes
    useEffect(() => {
        const fetchRoundData = async () => {
            let current_time = moment().format('YYYY-MM-DD HH:mm:ss');
            await set_async_data('start_time', current_time);
            let a = await get_async_data('remaining_lifes');
            settotalcoin(a);
            let round = await get_async_data('round');
            await analytics().logEvent(`Round_${round}`);
            if (round == 'round_17') {
                await set_async_data('round', 'round_1');
                setRound('round_1');
            } else {
                setRound(round); // update round state
            }

            let hint = await get_async_data('hints');
            // console.log('available HINTS ', hint);
            if (hint != null || hint != undefined) {
                setavailableHints(hint)
            }
        };
        fetchRoundData();
    }, []); // Empty dependency array ensures this only runs on mount

    // Update phrase when round changes
    useEffect(() => {
        if (round) {
            // console.log('ROUND CHANGED-----------------------------');
            const updatedPhrase = puzzleData[round];
            let disabledCharacters = getUnusedVisibleLetters(updatedPhrase);
            let repeatedHiddenAlphabet = getRepeatedHiddenAlphabets(updatedPhrase);


            // console.log(`DISABLE LETTER ${disabledCharacters} -->> ${disabledCharacters.includes('A')}`);

            let newKeyboard = rows.map((row, rowIndex) =>
                row.map((key, keyIndex) => {
                    const isDisabled = disabledCharacters.includes(key.letter);
                    // console.log(`Row ${rowIndex}, Key ${keyIndex}: Letter ${key.letter}, isDisabled: ${isDisabled}`);
                    return {
                        ...key,
                        isActive: !isDisabled, // If the letter is not in disabledCharacters, isActive = true
                    };
                })
            );


            newKeyboard = newKeyboard.map(row =>
                row.map(key => ({
                    ...key,
                    //  isActive: repeatedHiddenAlphabet.includes(key.letter) ? true : disabledCharacters.includes(key.letter) ? false : key.isActive,
                    isRepeating: repeatedHiddenAlphabet.includes(key.letter) && true
                }))
            );




            // console.log('ACTIVE KEYS', newKeyboard)

            setRows(newKeyboard);
            // const updatedPhrase = puzzleData['round_5'];
            setPhrase(updatedPhrase); // Update the phrase based on round
        }
    }, [round]); // Update whenever round changes

    const filterKeyboardKeys = () => {
        const letters = phrase.filter((item) => item.isHidden).map((item) => item.alphabet); // all letters that are missing in phrase
        setActiveLetters([...new Set(letters)]);
    };

    useEffect(() => {
        filterKeyboardKeys();
    }, [round, phrase]);

    useEffect(() => {
        const handleLetterPress = async () => {
            if (letterpressed && correctletter) {
                if (letterpressed === correctletter.alphabet) {

                    await letter_solved();
                    let updatedData = phrase.map(item =>
                        item.id === focusId ? { ...item, isHidden: false, isKey: false } : item
                    );

                    let prev_id = correctletter.id - 1;
                    let next_id = correctletter.id + 1;
                    // Updating previous and next items only if needed


                    if (prev_id >= 0 && prev_id < phrase.length) {
                        const prevItem = phrase[prev_id];
                        // console.log('PREV_ITEM', prevItem);

                        // Handle `isDoubleLocked` for the previous item
                        if (prevItem.isDoubleLocked) {
                            updatedData = updatedData.map(item =>
                                item.id === prev_id ? { ...item, isDoubleLocked: false } : item
                            );
                        }

                        // Handle `isSingleLocked` for the previous item
                        if (prevItem.isSingleLocked && !prevItem.isDoubleLocked) {
                            updatedData = updatedData.map(item =>
                                item.id === prev_id ? { ...item, isSingleLocked: false } : item
                            );
                        }
                    }

                    if (next_id >= 0 && next_id < phrase.length) {
                        const nextItem = phrase[next_id];
                        // console.log('NEXT_ITEM', nextItem);

                        // Handle `isDoubleLocked` for the next item
                        if (nextItem.isDoubleLocked) {
                            updatedData = updatedData.map(item =>
                                item.id === next_id ? { ...item, isDoubleLocked: false } : item
                            );
                        }

                        // Handle `isSingleLocked` for the next item
                        if (nextItem.isSingleLocked && !nextItem.isDoubleLocked) {
                            updatedData = updatedData.map(item =>
                                item.id === next_id ? { ...item, isSingleLocked: false } : item
                            );
                        }
                    }

                    // Check if both previous and next items need to reset
                    if (
                        prev_id >= 0 &&
                        next_id >= 0 &&
                        prev_id < phrase.length &&
                        next_id < phrase.length
                    ) {
                        const prevItem = phrase[prev_id];
                        const nextItem = phrase[next_id];

                        if (prevItem.isDoubleLocked && nextItem.isSingleLocked) {
                            updatedData = updatedData.map(item =>
                                item.id === prev_id
                                    ? { ...item, isDoubleLocked: false }
                                    : item.id === next_id
                                        ? { ...item, isSingleLocked: false }
                                        : item
                            );
                        }
                    }

                    // Handle increment for correct letters that are keys
                    if (correctletter.isKey) {
                        await incrementValue();
                    }

                    // Getting remaining occurrences of the letter pressed
                    const occurCount = updatedData.filter(item => item.alphabet === letterpressed && item.isHidden).length;

                    if (occurCount > 0) {
                        // Update rows if letter exists
                        const updatedRows = rows.map(row =>
                            row.map(keyObj =>
                                keyObj.letter === letterpressed ? { ...keyObj, isRepeating: true } : keyObj
                            )
                        );
                        setRows(updatedRows);
                    } else {
                        const updatedRows = rows.map(row =>
                            row.map(keyObj =>
                                keyObj.letter === letterpressed
                                    ? { ...keyObj, isRepeating: false, isActive: false }
                                    : keyObj
                            )
                        );
                        setRows(updatedRows);

                        updatedData = updatedData.map(item =>
                            item.alphabet === correctletter.alphabet ? { ...item, number: -3 } : item
                        );
                    }

                    // Set the updated phrase
                    let remainingCount = updatedData.filter(item => item.isHidden).length;
                    // console.log('REMAINING COUNT', remainingCount);


                    // console.log(`UPDATED DATA : ${JSON.stringify(updatedData)}`);
                    setPhrase(updatedData);
                    seteletterOccur(occurCount);

                    // Reset pressed letter and focus
                    setletterpressed(null);
                    setfocusId(null);
                    setcorrectletter(null);
                    filterKeyboardKeys();
                    changeIndex('next');
                    // console.log(`remainingCount : ${remainingCount}`);
                    if (remainingCount == 0) {
                        if (firsttry) {
                            await first_try_win();
                        }
                        // console.log(`puzzle complete next round: round_${parseInt(round.split('_')[1]) + 1}`);
                        await set_async_data('round', `round_${parseInt(round.split('_')[1]) + 1}`);
                        let string = concatenateAlphabets(phrase);
                        // await get_total_time();
                        let total_words = string.split(' ').length;
                        // console.log('TOTAL WORDS', total_words);
                        await word_solved(total_words);
                        // console.log(total_words);
                        // console.log(`NOW START NAVIGATING`);
                        navigation.replace('ResultScreen', { quote: string });
                    }
                } else {
                    setfirsttry(false);
                    // Handle mistake case
                    if (mistake >= 2 && !errorModal) {
                        setmistake(mistake + 1);
                        seterrorModal(true);
                    } else {
                        setmistake(mistake + 1);
                        trigger("notificationError", options);
                        setletterpressed(null);
                    }
                }
            }
        };
        handleLetterPress();
    }, [letterpressed, phrase, correctletter, focusId, rows, round]);

    useEffect(() => {
        // console.log(`useefff tot coin ${totalcoin}`)
        settotalcoin(totalcoin);
    }, [totalcoin])

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

    const handlePress = async (item) => {
        // console.log('ITEM', item);
        if (enableHint) {
            if (item.isDoubleLocked || item.isSingleLocked) {
                console.log('you are not able to reveal the locked item \n', item);
            } else {
                let prev_id = item.id - 1;
                let next_id = item.id + 1;

                let updatedData = phrase.map(arritem =>
                    (arritem.alphabet == item.alphabet && !arritem.isSingleLocked) ? { ...arritem, isHidden: false, number: -3 } : arritem
                );

                if (prev_id >= 0 && prev_id < phrase.length) {
                    const prevItem = phrase[prev_id];
                    // console.log('PREV_ITEM', prevItem);

                    // Handle `isDoubleLocked` for the previous item
                    if (prevItem.isDoubleLocked) {
                        updatedData = updatedData.map(item =>
                            item.id === prev_id ? { ...item, isDoubleLocked: false } : item
                        );
                    }

                    // Handle `isSingleLocked` for the previous item
                    if (prevItem.isSingleLocked && !prevItem.isDoubleLocked) {
                        updatedData = updatedData.map(item =>
                            item.id === prev_id ? { ...item, isSingleLocked: false } : item
                        );
                    }
                }

                if (next_id >= 0 && next_id < phrase.length) {
                    const nextItem = phrase[next_id];
                    // console.log('NEXT_ITEM', nextItem);

                    // Handle `isDoubleLocked` for the next item
                    if (nextItem.isDoubleLocked) {
                        updatedData = updatedData.map(item =>
                            item.id === next_id ? { ...item, isDoubleLocked: false } : item
                        );
                    }

                    // Handle `isSingleLocked` for the next item
                    if (nextItem.isSingleLocked && !nextItem.isDoubleLocked) {
                        updatedData = updatedData.map(item =>
                            item.id === next_id ? { ...item, isSingleLocked: false } : item
                        );
                    }
                }

                // Check if both previous and next items need to reset
                if (
                    prev_id >= 0 &&
                    next_id >= 0 &&
                    prev_id < phrase.length &&
                    next_id < phrase.length
                ) {
                    const prevItem = phrase[prev_id];
                    const nextItem = phrase[next_id];

                    if (prevItem.isDoubleLocked && nextItem.isSingleLocked) {
                        updatedData = updatedData.map(item =>
                            item.id === prev_id
                                ? { ...item, isDoubleLocked: false }
                                : item.id === next_id
                                    ? { ...item, isSingleLocked: false }
                                    : item
                        );
                    }
                }

                setPhrase(updatedData);
                setenableHint(false);
                changeIndex('next');
                let hints = await get_async_data('hints');
                await set_async_data('hints', hints - 1);
                setavailableHints(availableHints - 1);

                let remainingCount = phrase.filter(item => item.isHidden).length;
                if (remainingCount == 0) {
                    let string = concatenateAlphabets(phrase);
                    await set_async_data('round', `round_${parseInt(round.split('_')[1]) + 1}`);
                    navigation.navigate('ResultScreen', { quote: string });
                }
            }
        } else {
            setletterpressed(null);
            if (item.isHidden && !item.isSingleLocked && !item.isDoubleLocked) { // Only handle press if the item is not already shown
                setfocusId(item.id);
                setcorrectletter(item);
            }
        }
    };

    const renderPuzzle = () => {
        let content = [];
        let currentWord = [];
        phrase.forEach((item, index) => {
            let hintStyle = {}
            let isDoubleLocked = item.isDoubleLocked;
            let isSingleLocked = item.isSingleLocked;

            if (enableHint && item.isHidden && !item.isSingleLocked) {
                hintStyle = { borderWidth: 2, borderColor: '#01A56B', borderRadius: 8 };
            }

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
                            {item.isKey && (<Image style={{ width: 11, height: 20, position: 'absolute', zIndex: 3, top: '-40%', alignSelf: 'center' }} source={require('../assets/images/icons/star.png')} />)}
                            {isSingleLocked ? (<View onPress={() => handlePress(item)} style={[getLetterStyle(item), { alignSelf: 'center', backgroundColor: 'transparent' }]}><Image style={{ width: 15, height: 24, position: 'absolute', zIndex: 3, top: 10, alignSelf: 'center' }} source={item.isDoubleLocked ? require('../assets/images/icons/lock.png') : require('../assets/images/icons/locked.png')} /></View>) : (
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

    const start_game = async (type) => { // when player made 3 mistakes

        if (type == 'home') {
            await subtract_life();
            navigation.navigate('Home');
        }

        if (type == 'restart') {
            if (totalcoin > 0) {
                subtract_life().then(()=>{
                    navigation.replace('PlayGame');
                }).catch(error => {
                    navigation.replace('PlayGame');
                    console.error("Error removing lifes");
                });
            } else { 
                console.log('else part execute')
                seterrorModal(false);
                navigation.replace('Home');
            }
            // let a = await get_async_data('remaining_lifes');
            // if (a > 0) {
            //     settotalcoin( totalcoin - 1);
            //     await subtract_life();
            //     seterrorModal(false);
            //     setmistake(0);
            //     console.log(`AVAILABLE LIFES ${totalcoin}`)
            //     // settotalcoin(prev => a);
            // } else {
            //     setlivemodel(true);
            // }
        }

        if (type == 'resume') {
            console.log('resume clicked');
            setresumerewardad(true);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <PlayGameHeader mistake={mistake} round={round} setlivemodel={setlivemodel} livemodel={livemodel} totalcoin={totalcoin} />

                <View style={styles.puzzleArea}>
                    <PuzzleHeader setsettings={setsettings} setibutton={setibutton} />
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {renderPuzzle()}
                    </ScrollView>
                    <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                        {availableHints != null && availableHints > 0 ? (
                            <TouchableOpacity style={{ zIndex: 2 }} onPress={() => setenableHint(!enableHint)}>
                                {enableHint == true ? (<Image style={{ width: 40, height: 39, elevation: 10 }} source={require('../assets/images/icons/cancel.png')} />) : (
                                    <>
                                        <Text style={styles.hintCounter}>{availableHints}</Text>
                                        <Image style={{ width: 50, height: 49, elevation: 10, opacity: .7 }} source={require('../assets/images/hint.png')} />
                                    </>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => sethintAd(true)} style={{ zIndex: 2 }} >
                                <Image style={{ width: 60, height: 59, elevation: 10, opacity: 1 }} source={require('../assets/images/video_ad_hint.png')} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.keyboardArea}>
                    <AlphabetKeyboard setletterpressed={setletterpressed} changeIndex={changeIndex} rows={rows} />
                </View>

                {enableHint && (<View style={styles.hintOverlap}>
                    <View style={{ backgroundColor: '#F7F2EF', width: '90%', padding: 20, borderWidth: 2, borderColor: '#808080', borderRadius: 8 }}>
                        <Text style={{ fontSize: 26, textAlign: 'center', color: '#999999', lineHeight: 40 }}>Choose a Letter you want to reveal</Text>
                    </View>
                </View>)}

                {/* {settings && <Settings setsettings={setsettings} />} */}
                {isConnected ? (<View style={{ width: width }}>
                    <BannerAd unitId={BANNER_AD} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} onAdLoaded={() => console.log('ad loaded')}
                        onAdFailedToLoad={(error) => console.error('Ad failed to load:', error)} />
                </View>) : (<View style={{ width: width }}></View>)}
            </View>
            {(hintAd || livemodel) && (<View style={styles.loaderContainer}><ActivityIndicator size={'large'} /></View>)}
            {livemodel && (<LivesModel setearncoin={setearncoin} setlivemodel={setlivemodel} />)}


            {/* {earncoin && (<RewardedAd adId={COIN_REWARD} setrewardad={setearncoin} adPurpose={'onlyadLive'} setlivemodel={setlivemodel} />)} */}
            {earncoin && (<CoinReward setlivemodel={setlivemodel} setearncoin={setearncoin} settotalcoin={settotalcoin} />)}

            {errorModal && <ErrorModal start_game={start_game} />}
            {resumerewardad && (<ResumeReward seterrorModal={seterrorModal} setmistake={setmistake} setresumerewardad={setresumerewardad} />)}
            {/* {rewardad && (<RewardedAd adId={RESUME_REWARD} setrewardad={setrewardad} seterrorModal={seterrorModal} mistake={mistake} setmistake={setmistake} adPurpose={'resume_game'} />)} */}
            
            
            {hintAd && <HintRewardedAd adId={HINT_REWARD} adPurpose={'hint_ad'} sethintAd={sethintAd} setavailableHints={setavailableHints} />}
            {/* {restart && (<RewardedAd adId={RESUME_REWARD} setrestart={setrestart} seterrorModal={seterrorModal} mistake={mistake} setmistake={setmistake} setlivemodel={setlivemodel} adPurpose={'restart_game'} />)} */}






            {/* {settings && <Settings setsettings={setsettings} />} */}
            {settings && (<CommigSoon setclose={setsettings} />)}
            {ibutton && <Ibutton setibutton={setibutton} />}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  backgroundColor: '#f6e3dd'
        backgroundColor: '#d1dce0'
    },
    loaderContainer: {
        width: width,
        height: height,
        position: 'absolute',
        zIndex: 3,
        backgroundColor: `rgba(0,0,0,0.4)`,
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
        paddingTop: 30
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 17, // Added margin to the bottom of each row,
        justifyContent: 'flex-start', // Align items without extra space
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
    keyboardArea: {
        width: width,
        backgroundColor: '#F6E3DD',
        paddingBottom: 12,
    },
    hintOverlap: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        height: '30%',
        backgroundColor: `rgba(0,0,0,0.2)`,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hintCounter: {
        backgroundColor: '#0069F2',
        color: '#fff',
        width: 20,
        textAlign: 'center',
        borderRadius: 50,
        paddingHorizontal: 4,
        paddingVertical: 2,
        left: -4,
        top: 10,
        zIndex: 2
    }
});