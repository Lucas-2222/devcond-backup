import React, { createContext, useState, useContext, useCallback }  from "react";
import { StateProviderProps } from "./StateContext.type";

type User = {
  id: number;
  nome: string;
}

type Property = {
	id: number;
}

interface PropsState {
	token: string;
	property: Property;
  user: User;
  handleUser(user: User): void
}

const StateContext = createContext<PropsState>({} as PropsState );

const initalUser: User = {
	id:10,
	nome: 'Vinicius'
}

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(initalUser);
	const [token, setToken] = useState<string>('');
	const [property, setProperty] = useState<Property>({} as Property);

  const handleUser = useCallback((user: User)=> {
		setUser(user);

  },[]);

  return(
    <StateContext.Provider
      value={{
				token,
        user,
				property,
        handleUser
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