import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { WallScreen } from "../screens/WallScreen";
import DrawerCostum from "../components/DrawerCostum";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return(
    <Drawer.Navigator
      drawerContent={(props)=> <DrawerCostum route={undefined} {...props}/>}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#F5F6FA',
          shadowOpacity: 0,
          elevation: 0
        }
      }}
    >
      <Drawer.Screen 
        name='WallScreen'
        component={WallScreen}
        
      />
    </Drawer.Navigator>
  );
}

export default MainDrawer;