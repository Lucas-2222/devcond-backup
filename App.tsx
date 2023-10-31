import {GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler';
import Routes from "./src/routes";
import { StateProvider } from "./src/contexts/StateContext";
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();


const App = () => {

  return(
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaView style={{flex: 1}}>
        <StateProvider>
          <Routes />
        </StateProvider>
      </SafeAreaView>
    </GestureHandlerRootView>    
  );
}

export default App;