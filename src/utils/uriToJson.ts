interface ParamsUri {
  [key: string]: string;
}

function uriToJson(uri: string): ParamsUri {
  return JSON.parse(`{"${decodeURI(uri).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

export default uriToJson;