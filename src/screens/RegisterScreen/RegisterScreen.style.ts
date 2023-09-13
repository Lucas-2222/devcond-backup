import { styled } from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 20px;
    background-color: #F5F6FA;
`;

export const Logo = styled.Image`
    width: 250px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
`;
export const Field = styled.TextInput`
    border-width: 1px;
    border-color: #CCC;
    border-radius: 8px;
    background-color: #fff;
    color: #000;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 15px;
`;
export const ButtonText = styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
`;
export const ButtonArea = styled.TouchableOpacity`
    background-color: #8863E6;
    justify-content: center;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
    color: #fff;
`;