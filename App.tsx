import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from "./src/routes";
import { StateProvider } from "./src/contexts/StateContext";


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