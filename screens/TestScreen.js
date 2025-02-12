import { View, Text } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { BANNER_AD } from '../Helper/AppHelper'

const TestScreen = () => {
  return (
    <View>
      <BannerAd unitId={BANNER_AD}  size={BannerAdSize.BANNER} onAdLoaded={() => console.log('Ad Loaded')}
                              onAdFailedToLoad={(error) => console.error('Ad failed to load:', error)} />
    </View>
  )
}

export default TestScreen