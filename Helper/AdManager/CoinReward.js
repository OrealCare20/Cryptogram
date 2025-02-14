import { View, Text } from 'react-native';
import { useInterstitialAd, useRewardedAd } from 'react-native-google-mobile-ads';
import React, { useEffect } from 'react';
import { add_life, COIN_REWARD } from '../AppHelper';

const CoinReward = ({ setlivemodel, setearncoin, settotalcoin }) => {
    const { isLoaded, isClosed, load, show, error, isEarnedReward } = useRewardedAd(
        COIN_REWARD,
        {
            requestNonPersonalizedAdsOnly: true,
        },
    );

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (error) {
            console.log('Ad error', error);
            setlivemodel(prevState => !prevState);
            setearncoin(prevState => !prevState);
        }
    }, [error]);


    useEffect(() => {
        if (isClosed) {
            setlivemodel(false);
            setearncoin(false);
        }
    }, [isClosed]);

    useEffect(() => {
        if (isEarnedReward) {
            add_life().then(() => {
                setlivemodel(prevState => !prevState);
                setearncoin(prevState => !prevState);
                settotalcoin(prevItem => prevItem + 1);
            }).catch(error => {
                console.error("Error adding life:", error);
                setlivemodel(prevState => !prevState);
                setearncoin(prevState => !prevState);
            });
        }

    }, [isEarnedReward]);

    useEffect(() => {
        if (isLoaded) {
            console.log('Ad Loaded Successfully');
            show();
        }
    }, [isLoaded]);

    return <></>;
}

export default CoinReward;