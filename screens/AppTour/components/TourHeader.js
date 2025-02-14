import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';

const TourHeader = () => {
    return (
        <>
            <View style={styles.header}>
                <View style={[styles.column, { flexDirection: 'row' }]}>
                    <Image
                        style={{ width: 40, height: 40, opacity: 0.4 }}
                        source={require('../../../assets/images/OBJECTS.png')}
                    />
                    <Image
                        style={{
                            width: 16.31,
                            height: 16.31,
                            position: 'absolute',
                            bottom: 0,
                            left: '18%',
                            opacity: 0.4 
                        }}
                        source={require('../../../assets/images/plus.png')}
                    />
                </View>

                <View style={styles.column}>
                    <Text style={[styles.headerText, { textAlign: 'right' }]}>
                        Tour Level
                    </Text>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    column: {
        width: '33%',
        flexDirection: 'column'
    },
    headerText: {
        fontSize: 16,
        color: '#b3b3b3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        opacity: 0.4
    }
});
export default TourHeader;