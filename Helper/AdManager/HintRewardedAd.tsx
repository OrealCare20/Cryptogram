import React, { useEffect, useState } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';
import { set_async_data } from '../AppHelper';

export default function HintRewardedAd(props: any) {
  const [errorStatus, seterrorStatus] = useState(false);

  const { isLoaded, isClosed, load, show, error, isEarnedReward } = useRewardedAd(
    props.adId,
    {
      requestNonPersonalizedAdsOnly: false
    },
  );

  useEffect(() => {
    console.log('Loading Rewarded Ad');
    load();
  }, [load]);

  useEffect(() => {
    if (error) {
      console.log('Hint Rewarded Ad error', error);
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      if (error) {
        console.log('Hint Rewarded Intertitial Ad error', error);
        if (props.adType == 'low') {
          props.continue();
        }
        seterrorStatus(true);
        props.sethintAd(false);
      } else {
        seterrorStatus(false);
      }
    })()
  }, [error]);

  // ORIGINAL CLOSED AD USEEFFECT
  useEffect(() => {
    (async () => {
      if (isClosed) {
        console.log('Hint');

        if (props.adPurpose == 'hint_ad') {
          if (isClosed && !isEarnedReward) {
            console.log('Ad closed but reward not earned');
          } else {
            props.sethintAd(false);
            props.setavailableHints(1);
          }
        }
      }
    })()
  }, [isClosed]);

  useEffect(() => {
    (async () => {
      console.log('isEarnedReward current value:', isEarnedReward);
      if (isEarnedReward) {
        console.log('EarnedReward', isEarnedReward)
        try {
          console.log('Attempting to set HINT');
          await set_async_data('hints', '1');
          console.log('Hint successfully added');
          props.setavailableHints(1); // Update hints in the UI
        } catch (error) {
          console.error('Error setting hint:', error);
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
      }
      if (errorStatus) {
        console.log('error occured Rewarded Ad', errorStatus)
      }
    })();
  }, [isLoaded]);

  return <></>;
}