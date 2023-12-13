import { styled } from "styled-components/native";
export default {
    Container: styled.View`
        flex: 1;
        background-color: #F5F6FA;
        padding: 20px;
    `,
    Scroller: styled.ScrollView``,
    LoadingIcon: styled.ActivityIndicator``,
    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    NoListText: styled.Text`
        font-size: 15px;
        color: #000;
    `,
    List: styled.FlatList`
        flex: 1;
    `,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        padding: 10px;
    `,
    ObjectScroller: styled.ScrollView`
        width: 100%;
        padding-left: 20px;
        margin-bottom: 20px;
    `,
    AddButton: styled.TouchableOpacity`
        margin-right: 15px;
    `,
}