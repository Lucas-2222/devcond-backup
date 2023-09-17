import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PreloadScreen } from "../screens/PreloadScreen/";
import { LoginScreen } from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import { ChoosePropertyScreen } from "../screens/ChoosePropertyScreen";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen 
          name='PreloadScreen'
          component={PreloadScreen}
          gestureEnabled={true}
      />
      <Stack.Screen 
          name='LoginScreen'
          component={LoginScreen}
          gestureEnabled={true}
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
    </Stack.Navigator>
  );
}

export default StackRoutes;