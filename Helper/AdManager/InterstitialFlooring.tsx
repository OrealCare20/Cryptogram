import React, { useEffect, useState } from 'react';
import { useInterstitialAd } from 'react-native-google-mobile-ads';

export default function InterstitialFlooring(props: any) {
  const [errorStatus, seterrorStatus] = useState(false);

  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    'ca-app-pub-3940256099942544/1033173712',
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    console.log('Loading Interstitial Ad');
    load();
  }, [load]);

  useEffect(() => {
    console.log('Interstitial Ad error', error);
    // load();
  }, [error]);

  useEffect(() => {
    (async () => {
      if (error) {
        console.log('Intertitial Ad error', error);
        if (props.adType == 'low') {
          props.continue();
        }
        seterrorStatus(true);
      } else {
        seterrorStatus(false);
      }
    })()
  }, [error]);

  useEffect(() => {
    if (props.adPurpose == 'restart_game') {
      props.setrestart(false);
      props.seterrorModal(false);
    }
  }, [isClosed]);

  useEffect(() => {
    (async () => {
      if (isLoaded && !errorStatus) {
        show();
      }
      if (errorStatus) {
        console.log('error occured', errorStatus)
      }
    })();
  }, [isLoaded]);

  return <></>;
}