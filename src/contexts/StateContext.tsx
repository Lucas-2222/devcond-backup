import React, { createContext, useState, useContext, useCallback }  from "react";
import { StateProviderProps } from "./StateContext.type";
import { User } from "./StateContext.type";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Properties } from "../screens/ChoosePropertyScreen/ChoosePropertyScreen.types";

export type Property = {
	id: number;
  name: string;
}

export type PropWalls = {
  data: Walls[];
  error: string;
}

export type Walls = {
  id: string;
  title: string;
  dateCreated: Date;
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

export type PropWarns = {
  warning: Warns[];
  error: string;
} 

export type Photos = {
  name: string;
  uri?: string;
  fileName?: string;
  type?: string;
}

export type Warns = {
  id: string;
  title: string;
  status: string;
  dateCreated: Date;
  photos: Photos[];
}

export type AddWarn = {
  title: string;
  list: Photos[];
}

export type PropAddWarn = {
  info: string;
  idWarning:string;
  error: string;
}

export type Reservations = {
  id: string;
  title: string;
  cover: string;
  dates: string;
}

export type PropReservations = {
  data: Reservations[];
  error: string;
}

export type List = {
  id: string;
  idReservationType?: string;
  date: string;
  dates?: string;
  time: string;
  index?: number;
  cover: string;
  title: string;
}

export type PropList = {
  error: string;
  data: List[];
}



interface PropsState {
  user: User;
  property: Properties;
  walls: PropWalls;
  docs: PropDocs;
  warns: PropWarns;
  addWarn: PropAddWarn;
  reservations: PropReservations;
  list: List[];
  handleAddWarn(addWarn: AddWarn): void;
  handleWarns(warns: Warns): void;
  handleDocs(docs: Docs): void;
  handleWalls(walls: Walls): void;
  handleProperty(property: Properties): void;
  handleUser(user: User): void;
  handleReservations(reservations: Reservations): void;
  handleList(list: List[]): void;
  removeIndex(id: string): void;
}

const StateContext = createContext<PropsState>({} as PropsState );

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [property, setProperty] = useState<Properties>({} as Properties);
  const [walls, setWalls] = useState<PropWalls>({} as PropWalls);
  const [docs, setDocs] = useState<PropDocs>({} as PropDocs);
  const [warns, setWarns] = useState<PropWarns>({} as PropWarns);
  const [addWarn, setAddWarn] = useState<PropAddWarn>({} as PropAddWarn);
  const [reservations, setReservations] = useState<PropReservations>({} as PropReservations);
  const [list, setList] = useState<List[]>([] as List[]);

  const handleUser = useCallback((user: User)=> {
		setUser(user);

  },[]);

  const handleProperty =  useCallback( async (property: Properties)=>{
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

  const handleWarns = useCallback( async (warns: Warns)=>{
    await AsyncStorage.setItem('warns', JSON.stringify(warns))
    setDocs(prevState=>({
      ...prevState,
      warns
    }));
  }, []);


  const handleAddWarn = useCallback( async (addWarn: AddWarn)=>{
    await AsyncStorage.setItem('addWarn', JSON.stringify(addWarn))
    setAddWarn(prevState=>({
      ...prevState,
      addWarn
    }))
  }, []);

  const handleReservations = useCallback( async (reservations: Reservations)=>{
    await AsyncStorage.setItem('reservations', JSON.stringify(reservations))
    setReservations(prevState=>({
      ...prevState,
      reservations
    }))
  }, []);

  const handleList = useCallback( async (list: List[])=>{
    setList(list)
  },[]);

  const removeIndex = (id: string) => {
    setList(prevState=> {
      const newPrevState = prevState?.filter((item)=>(item.id !== id ))
      return newPrevState;
    })
  };
  
  return(
    <StateContext.Provider
      value={{
        user,
        property,
        walls,
        docs,
        warns,
        addWarn,
        reservations,
        list,
        handleAddWarn,
        handleWarns,
        handleDocs,
        handleWalls,
        handleProperty,
        handleUser,
        handleReservations,
        handleList,
        removeIndex
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