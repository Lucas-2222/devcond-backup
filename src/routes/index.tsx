import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import React from 'react';

const Routes = () => {
  return(
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
  );
}

export default Routes;