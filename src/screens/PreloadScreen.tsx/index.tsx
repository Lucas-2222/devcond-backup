import { StyleSheet, View,  Text, Button } from "react-native";
import { Container, LoadingIcon } from "./style";
import {useStateUser} from '../../contexts/StateContext';

export default () => {
	const {user, handleUser } = useStateUser();
  return(
    <Container>
      <LoadingIcon color='#8863E6' size='large'/>
			<Text>{`${user.nome} - ${user.id}`}</Text>
			<Button title='Change nome' onPress={()=> handleUser({id:11, nome: 'Liz'})}/>
    </Container>
  )
}