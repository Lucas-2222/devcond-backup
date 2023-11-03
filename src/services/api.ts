import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropLikes } from '../contexts/StateContext';

export const baseUrl = 'http://192.168.0.103:3007';

interface ApiResponse<T = any>{
  response: T;
}
const DEFAULT_MESSAGE = 'Algo deu errado, tente novamente mais tarde!';

export const request = async <T>(method: string, endpoint: string, params?: Record<string, any>) => {
  let token = await AsyncStorage.getItem('token');
  let hash = await AsyncStorage.getItem('hash');
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
    'Content-Type': "application/json", 
    'Accept': '*.*',
    'Accept-Encoding':'gzip, deflate, br',
    'Connection': 'keep-alive',
    'token':'',
    'hash': ''
  };

  if(token) {
    headers.token = `${token}`
  }

  if(hash) {
    headers.hash = hash
  }

  try {
    let req = await fetch(fullUrl,{headers, method, body})
    let res: ApiResponse<T> = await req.json();

    if(!res.response){
      throw new Error(DEFAULT_MESSAGE);
    }
    return {
      ...res.response, 
      status:req.status
    };    
  } catch (error) {
    throw new Error(error as string);
  }
}

export const requestFile = async <T>(endpoint: string, images: any[], title: string) => {
  let token = await AsyncStorage.getItem('token');
  let hash = await AsyncStorage.getItem('hash');
  let fullUrl = `${baseUrl}${endpoint}`;

  let formData = new FormData();
   images.forEach((item)=>{
     formData.append('image',{
       uri: item?.url,
       name: item?.fileName,
       type: item.type,
     })
   })
  formData.append('title', title)
  formData.append('status', "IN_REVIEW")
  let headers = {
    'Content-Type': "multipart/form-data", 
    'Accept': '*.*',
    'Accept-Encoding':'gzip, deflate, br',
    'Connection': 'keep-alive',
    'token':'',
    'hash': ''
  };

  if(token) {
    headers.token = `${token}`
  }

  if(hash) {
    headers.hash = hash
  }

  try {
    let req = await fetch(fullUrl,{headers, method:"post", body:formData})
    let res: ApiResponse<T> = await req.json();

    if(!res.response){
      throw new Error(DEFAULT_MESSAGE);
    }
    return {
      ...res.response, 
      status:req.status
    };    
  } catch (error) {
    throw new Error(error as string);
  }
    
}

export default {
  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
  logout: async () => {
    let json = await request('post', '/auth/logout', {});
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('property');
    return json;
  },
  likeWallPost: async (id: number): Promise<PropLikes> => {
    let json = await request<PropLikes>('post', `/wall/${id}/like`, {});
    return json;
  }
};