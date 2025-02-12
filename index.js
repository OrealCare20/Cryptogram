/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/analytics';
// import '@react-native-firebase/crashlytics';

import App from './App';
import { name as appName } from './app.json';
//import { firebaseConfig } from './Helper/AppHelper';

// if (!firebase.apps.length) {
//     console.log('No firebase added')
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app(); // if already initialized, use that one
// }

AppRegistry.registerComponent(appName, () => App);
