import { styled } from "styled-components/native";
export default {
    Container: styled.View`
        flex: 1;
        background-color: #F5F6FA;
        padding: 20px;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 10px;
    `,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        margin: 10px 0;
    `,
    Field: styled.TextInput`
        border-width: 1px;
        border-color: #CCC;
        background-color: #FFF;
        border-radius: 10px;
        color: #000;
        font-size: 15px;
        padding: 10px;
    `,
    PhotoArea: styled.View`
        margin-bottom: 30px;
    `,
    PhotoScroll: styled.ScrollView`
        flex: 1;
    `,
    PhotoAddButton: styled.TouchableOpacity`
        width: 65px;
        height: 65px;
        justify-content: center;
        align-items: center;
        border-width: 1px;
        border-color: #CCC;
        border-radius: 5px;
    `,
    PhotoItem: styled.View`
        width: 65px;
        margin-left: 5px;
        align-items: center; 
    `,
    Photo: styled.Image`
        width: 63px;
        height: 63px;
        border-radius: 5px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #8863E6;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    `,
    ButtonText: styled.Text`
        font-size: 15px;
        font-weight: bold;
        color: #FFF;    
    `,
    RemovePhotoButton: styled.TouchableOpacity`
        
    `

}