import React, { useEffect, useState } from 'react';
import { useRewardedAd, useRewardedInterstitialAd } from 'react-native-google-mobile-ads';
import { add_life, set_async_data } from '../AppHelper';

export default function RewardedAd(props: any) {
  const [errorStatus, seterrorStatus] = useState(false);

  const { isLoaded, isClosed, load, show, error, isEarnedReward } = useRewardedAd(
    props.adId,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    console.log('Loading Rewarded Interstitial Ad');
    load();
  }, [load]);
  
  useEffect(() => {
    console.log('Rewarded Interstitial Ad error', error);
    // load();
  }, [error]);

  useEffect(() => {
    (async () => {
      if (error) {
        console.log('Rewarded Intertitial Ad error', error);
        seterrorStatus(true);
        props.sethintAd(false);
        props.setrewardad(false);
        props.setrestart(false);
        props.seterrorModal(false);
      } else {
        seterrorStatus(false);
      }
    })()
  }, [error]);
  
  useEffect(() => {
    (async ()=> {
      if (isClosed) {
          console.log('Rewarded Ad Closed');
          props.setrewardad(false);
          if(props.adPurpose == 'adLive') {
            console.log('Navigating')
            props.navigation.navigate('PlayGame');
          }
  
          if(props.adPurpose == 'onlyadLive') {
            await add_life();
            props.setlivemodel(false);
          }

          if(props.adPurpose == 'hint_ad') {
            if (isClosed && !isEarnedReward) {
              console.log('Ad closed but reward not earned');
              props.sethintAd(false);
              props.setavailableHints(1);
            } else {
              props.sethintAd(false);
              props.setavailableHints(1);
            }
          }

          if(props.adPurpose == 'restart_game') {
            props.setrestart(false);
            props.seterrorModal(false);
          }
      }
    })()
  }, [isClosed]);
  
  useEffect(() => {
    (async ()=> {
      console.log('isEarnedReward current value:', isEarnedReward);
      if (isEarnedReward) {
        console.log('EarnedReward', isEarnedReward)
        
          if (props.adPurpose == 'adLive') {
            props.setlivemodel(false);
          }
  
          if(props.adPurpose == 'resume_game') {
            props.setmistake(props.mistake - 1);
            props.seterrorModal(false);
          }
  
          if (props.adPurpose === 'hint_ad') {
            console.log('Reward earned for hints');
            try {
              console.log('Attempting to set HINT');
              await set_async_data('hints', '1');
              console.log('Hint successfully added');
              props.setavailableHints(1); // Update hints in the UI
            } catch (error) {
              console.error('Error setting hint:', error);
            }
          }

          if(props.adPurpose == 'restart_game') {
            props.setrestart(false);
            props.seterrorModal(false);
          }
      } else {
        console.log('Reward not earned yet or no ad watched');
      }
    })()
  }, [isEarnedReward]);

  useEffect(() => {
    (async () => {
      if (isLoaded && !errorStatus) {
        show();
        if (props.adPurpose == 'adLive') {
          await add_life();
        }

        if(props.adPurpose == 'hint_ad') {
          props.sethintAd(false);
        }
      }
      if (errorStatus) {
        console.log('error occured Rewarded Ad', errorStatus)
      }
    })();
  }, [isLoaded]);

  return <></>;
}