import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropLikes, PropWalls } from '../contexts/StateContext';

export const baseUrl = 'http://192.168.0.103:3000';

interface ApiResponse<T = any>{
  response: T;
}

export const request = async <T>(method: string, endpoint: string, params?: Record<string, any>, images: FormData) => {
  const DEFAULT_MESSAGE = 'Algo deu errado, tente novamente mais tarde!';

  let token = await AsyncStorage.getItem('token');
  let hash = await AsyncStorage.getItem('hash');
  method = method.toLowerCase();
  let fullUrl = `${baseUrl}${endpoint}`;
  let body = null;
  let contetType = 'application/json';
  

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
    case 'fetchFile':
      let formData = new FormData();
      body = images;
      contetType = 'multipart/form-data';
      method = 'post'
      break;
  }

  let headers = {
    'Content-Type': contetType, 
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


const apiFetchFile = async (endpoint, jwt, hash, uri, filename, type) => {
  /*if (body.jwt){
      let jwt = AsyncStorage.getItem('jwt');
      if(jwt) {
          body.jwt = jwt;
      }
  }

  if (body.hash){
      let hash = AsyncStorage.getItem('hash');
      if(hash) {
          body.hash = hash;
      }
  }*/
  let formData = new FormData();
  formData.append('photo', {
      uri: uri,
      type: type,
      name: filename
  });
  formData.append('jwt', jwt);
  formData.append('hash', hash);

  const res = await fetch(BASEAPI+endpoint, {
      method:'POST',
      headers:{
          'Content-Type':'multipart/form-data',
          'Autorization':`Bearer ${jwt}`
      },
      body: formData
  });
  const json = await res.json();

  return json;
}

