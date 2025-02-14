import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useInterstitialAd, useRewardedAd } from 'react-native-google-mobile-ads';
import { RESUME_REWARD } from '../AppHelper';

const ResumeReward = ({ seterrorModal, setmistake, setresumerewardad }) => {
    const { isLoaded, isClosed, load, show, error, isEarnedReward } = useRewardedAd(
        RESUME_REWARD,
        {
            requestNonPersonalizedAdsOnly: true,
        },
    );

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (error) {
            setresumerewardad(prevItem => !prevItem);
            seterrorModal(prevItem => !prevItem);
        }
    }, [error]);

    useEffect(() => {
        if (isClosed) {
            console.log('Resume Ad Closed');
            seterrorModal(false);
            setresumerewardad(false);
        }
    }, [isClosed]);

      useEffect(() => {
        (async () => {
          console.log('isEarnedReward current value:', isEarnedReward);
          if (isEarnedReward) {
            setmistake(prevItem => prevItem - 1);
            seterrorModal(prevItem => !prevItem);
            setresumerewardad(prevItem => !prevItem);
          }
        })()
      }, [isEarnedReward]);

    useEffect(() => {
        if (isLoaded) {
            console.log('Ad Loaded Successfully');
            show();
        }
    }, [isLoaded]);


    return <></>
}

export default ResumeReward;