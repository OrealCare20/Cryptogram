import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import React from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');

const AD_ICON_WIDTH = width / 7;
const AD_ICON_RATIO = AD_ICON_WIDTH / 184;

const AD_BLOCK_CARD_WIDTH = width / 2 - 20;
const AD_BLOCK_CARD_RATIO = AD_BLOCK_CARD_WIDTH / 615;

const Subscription = (props) => {

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
                        shadowLine={1}
                        fontFamily='Supercell-Magic Regular'
                        customStyle={{ color: '#FFB002' }}
                    />
                    <ImageBackground source={require('../assets/images/button.png')} style={{ width: 80, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <OutlinedText
                            text={item.cost == 'free' ? `Get` : `Rs ${item.cost}`}
                            fontSize={14}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1}
                            fontFamily='Supercell-Magic Regular'
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
                {/* <View style={style.header}>
                    <View style={{ width: '24%', backgroundColor: '#F0E6DF', top: '-50%', paddingVertical: 10, borderRadius: 6, marginLeft: '37%', borderColor: '#000', borderWidth: 1 }}>
                        <OutlinedText
                            text={'SHOP'}
                            fontSize={20}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1}
                            fontFamily='Supercell-Magic Regular'
                            customStyle={{ color: '#FFB002' }}
                        />
                    </View>

                    <TouchableOpacity onPress={()=>props.setshop(false)} style={style.closeBtn}>
                        <Image style={style.close} source={require('../assets/images/close.png')} />
                    </TouchableOpacity>
                </View> */}

                <View style={style.header}>
                    <View style={{ width: '41%', paddingHorizontal: 8, marginLeft: '31%' }}>
                        <Text numberOfLines={1} style={style.title}>SHOP</Text>
                    </View>

                    <TouchableOpacity style={style.closeBtn} onPress={() => props.setshop(false)}>
                        <Image style={style.close} source={require('../assets/images/close.png')} />
                    </TouchableOpacity>
                </View>
                {/* {show()} */}

                <View style={style.row}>
                    <ImageBackground style={style.card} source={require('../assets/images/icons/ad_block_card.png')}>
                        <Text style={[style.cardText, { marginTop: 'auto' }]}>Remove Ads</Text>

                        <ImageBackground style={style.priceBtn} source={require('../assets/images/price_btn.png')}>
                            <Text style={style.price}>Rs 1350</Text>
                        </ImageBackground>
                    </ImageBackground>

                    <ImageBackground style={style.card} source={require('../assets/images/icons/idea_card.png')}>
                        <Text style={[style.cardText, { marginTop: 'auto', textAlign: 'left', left: '20%', top: '10%', fontSize: 26 }]}>1</Text>
                        <Text style={[style.cardText, { marginTop: 'auto', textAlign: 'left', left: 15 }]}>Free Hint</Text>
                        <ImageBackground style={style.priceBtn} source={require('../assets/images/price_btn.png')}>
                            <Text style={style.price}>Get</Text>
                        </ImageBackground>
                    </ImageBackground>

                    <ImageBackground style={style.card} source={require('../assets/images/icons/idea_card.png')}>
                        <Text style={[style.cardText, { marginTop: 'auto', textAlign: 'left', left: '20%', top: '10%', fontSize: 26 }]}>20</Text>
                        <Text style={[style.cardText, { marginTop: 'auto', textAlign: 'left', left: 15 }]}>Free Hint</Text>
                        <ImageBackground style={style.priceBtn} source={require('../assets/images/price_btn.png')}>
                            <Text style={style.price}>Rs 850</Text>
                        </ImageBackground>
                    </ImageBackground>

                    <ImageBackground style={style.card} source={require('../assets/images/icons/idea_card.png')}>
                        <Text style={[style.cardText, { marginTop: 'auto', textAlign: 'left', left: '20%', top: '10%', fontSize: 26 }]}>20</Text>
                        <Text style={[style.cardText, { marginTop: 'auto', textAlign: 'left', left: 15 }]}>Free Hint</Text>
                        <ImageBackground style={style.priceBtn} source={require('../assets/images/price_btn.png')}>
                            <Text style={style.price}>Rs 850</Text>
                        </ImageBackground>
                    </ImageBackground>
                </View>
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
        backgroundColor: '#EEF3F5',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
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
    title: {
        color: '#482A00',
        fontFamily: 'oktah_round_light-BF6407f0ed773d3',
        fontSize: 29,
        textAlign: 'center',
        fontWeight: '700',
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 2,
        marginVertical: 20
    },
    closeBtn: {
        marginLeft: 'auto',
        marginRight: '3%',
        top: '-50%'
    },
    close: {
        width: 33.4,
        height: 33.4
    },
    card: {
        width: AD_BLOCK_CARD_WIDTH,
        height: 589 * AD_BLOCK_CARD_RATIO,
        marginBottom: 13
    },
    ad_block_icon: {
        width: AD_ICON_WIDTH,
        height: 184 * AD_ICON_RATIO,
        marginTop: 15
    },
    cardText: {
        fontSize: 19,
        fontWeight: '900',
        textAlign: 'center'
    },
    row: {
        width: width * 0.94,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 12,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
        marginRight: '3%',
        top: '-50%'
    },
    priceBtn: {
        width: 122.83,
        height: 34.76,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 18
    },
    price: {
        fontSize: 17,
        fontWeight: '700'
    }
});
export default Subscription;