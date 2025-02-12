import React, { useEffect } from 'react';
import Route from './routes/Route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableFreeze } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { days_completed, set_async_data, remaining_lifes, generate_id, firebaseConfig } from './Helper/AppHelper';
enableFreeze(true);

const App = () => {

  SystemNavigationBar.immersive();


  useEffect(() => {
    (async () => {
      crashlytics().setCrashlyticsCollectionEnabled(true)
      // crashlytics().crash()
      analytics().setAnalyticsCollectionEnabled(true);

      await generate_id();
      await days_completed();
      await remaining_lifes();
      StatusBar.setHidden(true);
      setTimeout(() => {
        console.log('Hiding Splash Screen');
        SplashScreen.hide();
      }, 2000);
    })()
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;