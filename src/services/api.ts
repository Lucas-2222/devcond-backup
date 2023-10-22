import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropLikes, PropWalls } from '../contexts/StateContext';

export const baseUrl = 'http://192.168.0.103:3003';

export const request = async <T>(method: string, endpoint: string, params?: Record<string, any>) => {
  let token = await AsyncStorage.getItem('token');
  method = method.toLowerCase();
  let fullUrl = `${baseUrl}${endpoint}`;
  let body = null;

  switch(method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`; 
      break;
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params);
      break;
  }

  let headers = {
    'Content-Type': 'application/json', 
    'Accept': '*.*',
    'Accept-Encoding':'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Authorization':''
  };

  if(token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    let req = await fetch(fullUrl,{headers, method, body})
    let res: T = await req.json();

    return {...res, status:req.status};    
  } catch (error) {
    throw new Error(error as string);
  }
    
}

export default {
  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
  logout: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('post', '/auth/logout', {});
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('property');
    return json;
  },
  likeWallPost: async (id: number): Promise<PropLikes> => {
    let token = await AsyncStorage.getItem('token');
    let json = await request<PropLikes>('post', `/wall/${id}/like`, {});
    return json;
  }
};


