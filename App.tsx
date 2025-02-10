import React, { useEffect } from 'react';
import Route from './routes/Route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableFreeze } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { days_completed, set_async_data, remaining_lifes, generate_id } from './Helper/AppHelper';

enableFreeze(true);

const App = () => {

  SystemNavigationBar.immersive();

  useEffect(() => {
    (async () => {
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