import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerCostum from "../components/DrawerCostum";
import { WallScreen } from "../screens/WallScreen";
import { DocumentScreen } from "../screens/DocumentScreen";
import { BilletScreen } from "../screens/BilletScreen";
import { WarningScreen } from "../screens/WarningScreen";
import { WarningAddScreen } from "../screens/WarningAddScreen";
import { ReservationScreen } from "../screens/ReservationScreen";
import { ReservationAddScreen } from "../screens/ReservationAddScreen";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return(
    <Drawer.Navigator
      drawerContent={(props)=> <DrawerCostum  route={undefined} {...props}/>}
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
        options={{headerTitle:"Mural de avisos"}}
      />
      <Drawer.Screen 
        name='DocumentScreen'
        component={DocumentScreen}
        
      />
      <Drawer.Screen 
        name='BilletScreen'
        component={BilletScreen}
        
      />
      <Drawer.Screen 
        name='WarningScreen'
        component={WarningScreen}
      />
      <Drawer.Screen 
        name='WarningAddScreen'
        component={WarningAddScreen}
      />
      <Drawer.Screen 
        name='ReservationScreen'
        component={ReservationScreen}
      />
      <Drawer.Screen 
        name='ReservationAddScreen'
        component={ReservationAddScreen}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawer;