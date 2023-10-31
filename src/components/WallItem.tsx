import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PropLikes, PropWalls, Walls, useStateUser } from '../contexts/StateContext';
import api from '../services/api';

const Box = styled.View`
  background-color: #FFF;
  border-width: 2px;
  border-color: #E8E9ED;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 10px; 
`;
const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InfoArea = styled.View`
  margin-left: 15px;
  flex: 1;
`;
const Title = styled.Text`
  color: #000;
  font-size: 17px;
  font-weight: bold;
`;
const Date = styled.Text`
  color: #9C9DB9;
  font-size: 14px;
  font-weight: bold;
`;

const Body = styled.Text`
  color: #000;
  font-size: 15px;
  margin: 15px 0;
`;

const FooterArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LikeButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
const LikeText = styled.Text`
  margin-left: 5px;
  font-size: 13px;
  color: #9C9DB9;
`;

const WallItem: React.FC<Walls> = ({title, dateCreated, body, id, likes, liked}) => {

  const [likeCount, setLikeCount] = useState(likes);
  const [onLiked, setOnLiked] = useState(liked);

  const handleLike = async () => {
    setOnLiked(!onLiked);
    const result = await api.likeWallPost(id);
    if(result.error == '') {
      setLikeCount(Math.floor(Math.random() * 100) + 1);
      //setLikeCount( result.likes);
      //setOnLiked( result.liked );
    } else {
      console.log(result.error);
    }
  }

  return(
    <Box>
      <HeaderArea>
          <Icon name="newspaper-o" size={30} color="#8B63E7"/>
          <InfoArea>

            <Title>{title}</Title>
            <Date>{dateCreated?.toString()}</Date>
          </InfoArea>
      </HeaderArea>
      <Body>
          {body}
      </Body>
      <FooterArea>
        <LikeButton onPress={handleLike}>
          {onLiked ? 
            <Icon name="heart" size={17} color="#ff0000"/>
          :
            <Icon name="heart-o" size={17} color="#ff0000"/>
          }
        </LikeButton>
        <LikeText>{likeCount} pessoa{likeCount==1?'':'s'} curti{likeCount==1?'u':'ram'}</LikeText>
      </FooterArea>
    </Box>
  );
};
export default WallItem;