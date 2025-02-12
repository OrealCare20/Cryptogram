import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { get_async_data } from '../Helper/AppHelper';

export default function PlayGameHeader({ mistake, round, setlivemodel }) {
    // Limit mistake count to a maximum of 3
    const [lives, setuseState] = useState(5);
    
    useEffect(()=>{
        (async ()=> {
            if (mistake > 3) {
                mistake = 3;
            }
            let a = await get_async_data('remaining_lifes');
            setuseState(a);
        })();
    }, []);

    return (
        <View style={styles.header}>
            <View style={styles.column}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.headerBadgeIcon} source={require('../assets/images/OBJECTS.png')} />
                    <View style={styles.headerBadge}>
                        <Text style={[styles.headerText, {color: '#BE8763', fontSize: 15, fontWeight: '800'}]}>{lives}</Text>
                    </View>
                    <TouchableOpacity style={{padding: 5}} onPress={()=>setlivemodel(true)}>
                        <Image style={{ width: 18.4, height: 18.9, marginLeft: 0 }} source={require('../assets/images/plus.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>Chances</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '40%',
                        alignSelf: 'center',
                        marginTop: 5
                    }}
                >
                    {mistake > 0 ? (
                        <>
                            {Array(mistake).fill().map((_, index) => (
                                <Image
                                    key={`miss-${index}`}
                                    style={{ width: 13.54, height: 13.54 }}
                                    source={require('../assets/images/icons/miss-hint.png')}
                                />
                            ))}
                            {Array(3 - mistake).fill().map((_, index) => (
                                <Image
                                    key={`heart-${index}`}
                                    style={{ width: 14, height: 11.67 }}
                                    source={require('../assets/images/icons/heart.png')}
                                />
                            ))}
                        </>
                    ) : (
                        Array(3).fill().map((_, index) => (
                            <Image
                                key={`heart-${index}`}
                                style={{ width: 14, height: 11.67 }}
                                source={require('../assets/images/icons/heart.png')}
                            />
                        ))
                    )}
                </View>
            </View>
            <View style={styles.column}>
                <Text style={[styles.headerText, { textAlign: 'right' }]}>
                    Level {round.split('_')[1]}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        paddingTop: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    column: {
        width: '33%',
        flexDirection: 'column'
    },
    headerBadgeIcon: {
        width: 34,
        height: 34,
        position: 'absolute',
        zIndex: 1
    },
    headerBadge: { width: 53, height: 22, backgroundColor: '#E7D2C6', borderRadius: 7, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 10, marginLeft: '11%' },
    headerText: {
        fontSize: 18,
        color: '#D7AD94',
        fontWeight: '700',
        textAlign: 'center'
    }
});