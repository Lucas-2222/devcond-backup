import styled from "styled-components/native";

export default {
  Container: styled.View`
    flex: 1;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 20px;
  `,
  LoadingIcon: styled.ActivityIndicator``,
  ButtonArea: styled.TouchableOpacity`
    background-color: ${({theme})=> theme.colors.botton_color};
    padding: 12px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `,
  ButtonText: styled.Text`
    color: #FFF;
    font-size: 15px;
    font-weight: bold;
  `,
  Title: styled.Text`
    font-size: 17px;
    margin: 10px 0;
  `,
  NoListArea: styled.View`
    justify-content: center;
    align-items: center;
    padding: 30px;
  `,
  NoListText: styled.Text`
    font-size: 15px;
    color: #000;
  `,

}