import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import styled from "styled-components/native";
import { useStateUser } from "../contexts/StateContext";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

import uriToJson from "../utils/uriToJson";

const DrawerArea = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

const DrawerLogoArea = styled.View`
    padding: 10px 20px;
    border-bottom-width: 1px;
    border-bottom-color: #EEE;
`;
const DrawerLogo = styled.Image`
    width: 190px;
    height: 40px; 
`;
const DrawerScroller = styled.ScrollView`
    flex: 1;
    margin: 20px 0;
`;
const ChangeUnitArea = styled.View`
    margin: 10px;
`;
const ChangeUnitButton = styled.TouchableOpacity`
    background-color: #8863E6;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
const ChangeUnitButtonText = styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
`;
const FooterArea = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const FooterInfo = styled.View``;
const FooterProfile = styled.Text`
    font-size: 15px;
    color: #000;
`;
const FooterUniText = styled.Text`
    font-size: 15px;
    color: #666E78;
`;
const FooterUnitButton = styled.TouchableOpacity``;

const MenuButton = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 5px;
    align-items: center;
    border-radius: 5px;
`;
const MenuSquare = styled.View`
    width: 5px;
    height: 35px;
    margin-right: 20px;
    background-color: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;
const MenuButtonText = styled.Text`
    font-size: 15px;
    margin-left: 10px;
    color:${props=>props.active ? "#FF0000" : "#666E78"}
`;

type Props = NativeStackScreenProps<any>

export default ({navigation, ...props}: Props) => {

    const [active, setActive] = useState<number>(0);
    const menus = [
        {title: 'Mural de Avisos', icon: 'inbox',  action:'type=navigation&screen=WallScreen'},
        {title: 'Documentos', icon: 'file-text',  action:'type=navigation&screen=DocumentScreen'},
        {title: 'Reservas', icon: 'calendar', action:'type=navigation&screen=ReservationScreen'},
        {title: 'Livro de Ocorrências', icon: 'bug',  action:'type=navigation&screen=WarningScreen'},
        {title: 'Achados e Perdidos', icon: 'search',  action:'type=navigation&screen=FNLScreen'},
        {title: 'Boletos', icon:'wpforms', action:'type=navigation&screen=BilletScreen'},
        {title: 'Perfil', icon: 'user',  action:'type=navigation&screen=ProfileScreen'},
        {title: 'Sair', icon: 'toggle-left', action:'type=onPress&action=sair'}
    ];

    const { user, property } = useStateUser(); 

    const handleChangeUnit = async () => {
        await AsyncStorage.removeItem('property')
        navigation.reset({
			index: 1,
			routes:[{name: 'ChoosePropertyScreen'}]
		})
    };
    
    const handleLogout = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes: [{name: 'LoginScreen'}]
        });
    };

    const onPressAction = (acao: string, index: number) => {
        const { type, screen, action} = uriToJson(acao);
        setActive(index);
        switch(type){
            case 'navigation':
                navigation.navigate(screen)
                break;
            case 'onPress' :
                if (action === 'sair') handleLogout()
                break;
            default:
        }
    }

    return(
        <DrawerArea>
            <DrawerLogoArea>
                <DrawerLogo source={require('../assets/homelogo.png')} resizeMode="contain" />
            </DrawerLogoArea>
            <DrawerScroller>
                {menus.map((item, index)=>(
                    <MenuButton key={index} onPress={()=>onPressAction(item.action, index)}>
                        <MenuSquare></MenuSquare>
                        <Icon name={item.icon} size={20} color={'#666E78'} />
                        <MenuButtonText active={index === active}>{item.title}</MenuButtonText>
                    </MenuButton>
                ))}
            </DrawerScroller>
            <ChangeUnitArea>
                    <ChangeUnitButton onPress={handleChangeUnit}>
                        <ChangeUnitButtonText>Trocar Unidade</ChangeUnitButtonText>
                    </ChangeUnitButton>
            </ChangeUnitArea>
        <FooterArea>
                <FooterInfo>
                    <FooterProfile>Olá {user.name}</FooterProfile>
                    <FooterUniText>{property.name}</FooterUniText>
                </FooterInfo>
                <FooterUnitButton onPress={()=>navigation.navigate('UnitScreen')}>
                    <Icon name="gear" size={24} color='#666E78'/>
                </FooterUnitButton>
        </FooterArea>
        </DrawerArea>
    );
} 