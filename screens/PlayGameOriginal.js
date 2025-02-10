import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { trigger } from "react-native-haptic-feedback";
import AlphabetKeyboard from '../components/AlphabetKeyboard';
import { puzzleData } from '../Helper/data';
import PlayGameHeader from '../components/PlayGameHeader';
import ErrorModal from '../components/ErrorModal';
import { options } from '../Helper/AppHelper';
import PuzzleHeader from '../components/PuzzleHeader';

export default function PlayGame({ navigation }) {
    const [round, setRound] = useState('Round1'); // game round
    const [data, setData] = useState(puzzleData[round]); // puzzle sentence
    const [mistake, setmistake] = useState(0); // mistake count
    const [activeLetters, setActiveLetters] = useState([]); // contain all the missing letters of sentence
    const [letterpressed, setletterpressed] = useState(null); // pressed from keyboard
    const [correctletter, setcorrectletter] = useState(null); // correct letter for focused item
    const [focusId, setfocusId] = useState(null); // contains missing letter id/index to highlight it's BG
    const [errorModal, seterrorModal] = useState(false);

    const filterKeyboardKeys = () => {
        const letters = data.filter((item) => !item.show).map((item) => item.letter);
        setActiveLetters([...new Set(letters)]);
    };

    useEffect(() => {
        filterKeyboardKeys();
    }, [round, data]);

    useEffect(() => {
        if (letterpressed) {
            // console.log(letterpressed)
            if (letterpressed === correctletter) {
                const updatedData = data.map(item =>
                    item.id === focusId ? { ...item, show: true } : item
                );
                setData(updatedData);
                setletterpressed(null);
                setfocusId(null);
                setcorrectletter(null);
                filterKeyboardKeys();
                changeIndex('next');
            } else {
                if (mistake === 3) {
                    seterrorModal(true);
                } else {
                    setmistake(mistake + 1);
                    trigger("notificationError", options);
                    setletterpressed(null);
                }
            }
        }
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

        data.forEach((item, index) => {
            if (item.letter === '*' || item.letter === ' ') { // Handle space or special character as word separator
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
                    <View style={styles.letterContainer} key={`letter-${index}`}>
                        <Text onPress={() => handlePress(item)} style={getLetterStyle(item)}>
                            {item.show || (focusId === item.id && letterpressed) ? item.letter : ''}
                        </Text>
                        <Text style={styles.number}>{item.number}</Text>
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
        backgroundColor: !item.show && focusId === item.id ? '#FFB002' : item.show ? 'transparent' : '#fff',
        textAlign: 'center',
    });

    return (
        <>
            <SafeAreaView style={styles.container}>
                <PlayGameHeader mistake={mistake} round={round} />
                <View style={styles.puzzleArea}>
                    <PuzzleHeader />
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {renderPuzzle()}
                    </ScrollView>
                </View>
                <View style={styles.keyboardArea}>
                    <AlphabetKeyboard activeLetters={activeLetters} setletterpressed={setletterpressed} changeIndex={changeIndex} />
                </View>
                {errorModal && <ErrorModal navigation={navigation} seterrorModal={seterrorModal} />}
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B5C6CE'
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
        padding: 10
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginRight: 30,
        marginBottom: 40, // Added margin to the bottom of each row
    },
    textInput: {
        height: 30,
        width: 20,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 6,
        margin: 2,
    },
    blankSpace: {
        width: 10,
        height: 30,
    },
    keyboardArea: {
        width: '100%',
        backgroundColor: '#F6E3DD',
        paddingVertical: 12,
    },
});