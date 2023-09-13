import React, { createContext, useState, useContext, useCallback }  from "react";
import { StateProviderProps } from "./StateContext.type";
import { Login } from "../screens/LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  nome: string;
}

type Property = {
	id: number;
  name: string;
}

interface PropsState {
  user: Login;
  property: Property[];
  handleProperty(property: Property[]): void;
  handleUser(user: Login): void;
}

const StateContext = createContext<PropsState>({} as PropsState );


const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Login>({} as Login);
  const [property, setProperty] = useState<Property[]>([]);

  const handleUser = useCallback((user: Login)=> {
    AsyncStorage.setItem('token', user.token)
		setUser(user);

  },[]);

  const handleProperty =  useCallback( async (property: Property[])=>{
    await AsyncStorage.setItem('property', JSON.stringify(property))
    setProperty(property);
  },[])

  return(
    <StateContext.Provider
      value={{
        user,
        handleUser,
        property,
        handleProperty
      }} 
    >
      {children}
    </StateContext.Provider>
  );
};

function useStateUser(): PropsState {
  const context = useContext(StateContext);

  if(!context){
    throw new Error('useStateUser deve ser usado em StateProvider')
  }
  return context;
}

export { StateProvider, useStateUser }