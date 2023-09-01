import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreloadScreen from "../screens/PreloadScreen.tsx";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name='PreloadScreen'
                component={PreloadScreen}
            />
        </Stack.Navigator>
    );
}

export default StackRoutes;