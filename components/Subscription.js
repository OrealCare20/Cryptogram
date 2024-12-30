import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import React from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
const { width, height } = Dimensions.get('screen');

const Subscription = () => {

    let subscribe = [
        { type: 'Remove Ads', icon: require('../assets/images/remove-ad.png'), cost: 1350 },
        { type: '1 free hint', icon: require('../assets/images/hint.png'), cost: 'free' },
        { type: '20 hint', icon: require('../assets/images/hint.png'), cost: 850 },
        { type: '50 hint', icon: require('../assets/images/hint.png'), cost: 1350 },
    ]

    const show = () => {
        let jsx = subscribe.map((item, index) => {
            return (
                <View style={style.row} key={index}>
                    <Image style={style.icon} source={item.icon} />
                    <OutlinedText
                        text={item.type}
                        fontSize={14}
                        fontWeight={'500'}
                        outlineColor={'#000'}
                        shadowLine={2}
                        fontFamily='Roboto-BlackItalic'
                        customStyle={{ color: '#FFB002' }}
                    />
                    <ImageBackground source={require('../assets/images/button.png')} style={{ width: 80, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <OutlinedText
                            text={item.cost == 'free' ? `Get` : `Rs ${item.cost}`}
                            fontSize={14}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily='Roboto-BlackItalic'
                            customStyle={{ color: '#fff' }}
                        />
                    </ImageBackground>
                </View>
            )
        })
        return jsx;
    }

    return (
        <View style={style.container}>
            <View style={style.subscriptionContainer}>
                <View style={style.header}>
                    <View style={{ width: '24%', backgroundColor: '#F0E6DF', top: '-50%', paddingVertical: 10, borderRadius: 6, marginLeft: '37%' }}>
                        <OutlinedText
                            text={'SHOP'}
                            fontSize={20}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={2}
                            fontFamily='Roboto-BlackItalic'
                            customStyle={{ color: '#FFB002' }}
                        />
                    </View>

                    <TouchableOpacity style={style.closeBtn}>
                        <Image style={style.close} source={require('../assets/images/close.png')} />
                    </TouchableOpacity>
                </View>

                {show()}
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: `rgba(0,0,0,0.5)`,
        position: 'absolute',
        zIndex: 1
    },
    subscriptionContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopEndRadius: 40,
        flexDirection: 'column',
        marginTop: 'auto',
        paddingBottom: 20
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        width: width * 0.85,
        alignSelf: 'center',
        backgroundColor: '#F0E6DF',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },
    icon: {
        width: 29.24,
        height: 29.18,
    },
    close: {
        width: 33.4,
        height: 33.4
    }, 
    closeBtn: {
        marginLeft: 'auto',
        marginRight: '10%',
        top: '-50%'
    }
});
export default Subscription;