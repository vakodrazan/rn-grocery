/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// Make swipe working on Android
import {gestureHandlerRootHOC} from "react-native-gesture-handler"

AppRegistry.registerComponent(appName, () => App);
// Make swipe working on Android
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
