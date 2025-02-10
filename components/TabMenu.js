import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('screen');

const iconWidth = width / 4 - 65;
const iconRatio = iconWidth / 100;


export default function TabMenu({showstats, setshowstats, setshop, shop}) {
    return (
        <View
            style={{ height: 'auto', width: width, position: 'absolute', bottom: 3 }}>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.touchable}>
                    <Image style={styles.icon} source={require('../assets/images/icons/home_selected.png')}/>
                    <Text numberOfLines={1} style={styles.menuTitle}>Home</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={()=>setshop(true)} style={styles.touchable}>
                    <Image style={styles.icon} source={require('../assets/images/icons/shop_unselected.png')}/>
                    <Text numberOfLines={1} style={styles.menuTitle}>Shop</Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={()=>setshowstats(true)} style={[styles.touchable, {marginTop: 4}]}>
                    <Image style={[styles.icon]} source={require('../assets/images/icons/stats_unselected.png')}/>             
                    <Text numberOfLines={1} style={styles.menuTitle}>Statistics</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable}>
                    <Image style={styles.icon} source={require('../assets/images/icons/collection_unselected.png')}/>
                    <Text numberOfLines={1} style={styles.menuTitle}>Collection</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    menuContainer: {
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10
    },
    adContainer: {
        width: width,
        height: 'auto',
    },
    touchable: {
        width: width / 4 - 30,
        borderRadius: 12,
        backgroundColor: '#FBF8F2',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7
    },  
    card: {
        width: iconWidth,
        alignSelf: 'center',
        verticalAlign: 'middle',
        height: undefined,
    },
    icon: {
        width: iconWidth,
        height: 96 * iconRatio,
    },
    menuTitle: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
        color: '#7B5500',
        fontFamily: 'GermaniaOne-Regular',
        marginTop: 5
    },
});