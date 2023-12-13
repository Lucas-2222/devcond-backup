import { styled } from "styled-components/native";
export default {
    Container: styled.View`
        flex: 1;
        background-color: #F5F6FA;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 20px;
    `,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        margin: 10px 0;
    `,
    PhotoArea: styled.View``,
    Field: styled.TextInput`
        background-color: #FFF;
        padding: 15px;
        color: #000;
        margin-bottom: 15px;
        font-size: 15px;
        border-radius: 10px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #8863E6;
        padding: 15px;
        justify-content: center;
        align-items: center;
        border-radius: 35px;
    `,
    ButtonText: styled.Text`
        color: #fff;
    `,
    PhotoItem: styled.Image`
        height: 200px;
        border-radius: 5px;
        margin-bottom: 10px;
    `,

}