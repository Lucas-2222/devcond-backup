import styled from "styled-components/native";

export default {
  Container: styled.View`
    flex: 1;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
  `,
  LoadingIcon: styled.ActivityIndicator`
    margin-top: 20px;
  `,
  CoverImage: styled.Image`
    background-color: #CCC;
    height: 150px;
    border-radius: 15px;
  `,
  CalendarArea: styled.View`
    margin: 20px;
  `,
  Title: styled.Text`
    color: #000;
    font-weight: bold;
    font-size: 17px;
    margin: 10px 20px;
  `,
  TimeList: styled.View`
    margin-top: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 30px;
  `,
  TimeItem: styled.TouchableOpacity`
    border-color: #CCC;
    border-radius: 5px;
    margin: 5px 20px;
    color: #000;
    padding: 10px;
    width: 25%;
    height: 40px;
    justify-content: center;
  `,
  TimeText: styled.Text`
    color: #000;
    font-size: 14px;
  `,
  ButtonView: styled.View`
    padding: 10px;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863E6;
    padding: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 35px;
  `,
  ButtonText: styled.Text`
    font-weight: bold;
    color: #FFF;
    font-size: 15px;
  `,

}