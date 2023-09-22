import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PreloadScreen } from "../screens/PreloadScreen/";
import { LoginScreen } from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import { ChoosePropertyScreen } from "../screens/ChoosePropertyScreen";

import  MainDrawer  from "./MainDrawer";
const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, customAnimationOnGesture: true, fullScreenGestureEnabled: true }}>
      <Stack.Screen 
          name='PreloadScreen'
          component={PreloadScreen}
      />  
      <Stack.Screen 
          name='LoginScreen'
          component={LoginScreen}
      />
      <Stack.Screen 
          name='RegisterScreen'
          component={RegisterScreen}
          options={{headerShown: true}}
      />
      <Stack.Screen 
          name='ChoosePropertyScreen'
          component={ChoosePropertyScreen}
          options={{headerShown: false}}
      />
      <Stack.Screen 
          name='MainDrawer'
          component={MainDrawer}
          options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
}

export default StackRoutes;