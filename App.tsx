import {GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler';
import Routes from "./src/routes";
import { StateProvider } from "./src/contexts/StateContext";
import React from 'react';


const App = () => {

  return(
    <GestureHandlerRootView style={{flex:1}}>
      <StateProvider>
        <Routes />
      </StateProvider>
    </GestureHandlerRootView>    
  );
}

export default App;