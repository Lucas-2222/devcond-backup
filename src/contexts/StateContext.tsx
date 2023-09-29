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
  property: Property;
  handleProperty(property: Property): void;
  handleUser(user: Login): void;
  walls: PropWalls;
  handleWalls(walls: Walls): void;
  docs: PropDocs;
  handleDocs(docs: Docs): void;
}

export type PropWalls = {
  data: Walls[];
  error: string;
}

export type Walls = {
  id: number;
  title: string;
  dateCreated: string;
  body: string;
  likes: number;
  liked: boolean;
}

export interface PropLikes extends Likes {
  error: string;
}

export type Likes = {
  likes: number;
  liked: boolean;
  id: number;
}

export type PropDocs = {
  data: Docs[];
  error: string;
}

export type Docs= {
  id: number;
  title: string;
  fileurl: string;
}

const StateContext = createContext<PropsState>({} as PropsState );


const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Login>({} as Login);
  const [property, setProperty] = useState<Property>({} as Property);
  const [walls, setWalls] = useState<PropWalls>({} as PropWalls);
  const [docs, setDocs] = useState<PropDocs>({} as PropDocs);

  const handleUser = useCallback((user: Login)=> {
    AsyncStorage.setItem('token', user.token)
		setUser(user);

  },[]);

  const handleProperty =  useCallback( async (property: Property)=>{
    await AsyncStorage.setItem('property', JSON.stringify(property))
    setProperty(property);
  },[]);

  const handleWalls = useCallback( async (walls: Walls)=>{
    await AsyncStorage.setItem('walls', JSON.stringify(walls))
    setWalls(prevState=>({
      ...prevState,
      walls
    }));
  }, []);

  const handleDocs = useCallback( async (docs: Docs)=>{
    await AsyncStorage.setItem('docs', JSON.stringify(docs))
    setDocs(prevState=>({
      ...prevState,
      docs
    }));
  }, []);

  return(
    <StateContext.Provider
      value={{
        user,
        handleUser,
        property,
        handleProperty,
        walls,
        handleWalls,
        docs,
        handleDocs
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