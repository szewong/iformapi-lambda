const axios = require('axios'),
      qs = require('qs'),
      DEFAULT_ENV = "iformbuilder",
      API_URL = "https://{servername}.{iform_env}.com/exzact/api/v70",
      OAUTH_URL = "https://{servername}.{iform_env}.com/exzact/api/oauth",
      TOKEN_PATH = '/token',
      AUTHENTICATE_PATH = '/auth';

class APIController{
  constructor(config){
    this.ifbConfig = config;
  }

  get(request, response){
    this.sendRequest(request, response, 'get');
  }

  delete(request, response){
    this.sendRequest(request, response, 'delete');

  }

  post(request, response){
    this.sendRequest(request, response, 'post');
  }

  put(request, response){
    this.sendRequest(request, response, 'put');
  }

  authenticate(request, response){
    let servername = request.params.servername;
    if(!request.query || !request.query.redirect_uri) response.json({error: "redirect_uri is required"});
    const queryString = `response_type=code&redirect_uri=${request.query.redirect_uri}&client_id=${this.ifbConfig.client_id}&server_id=${servername}`;
    const endpoint = this.getEndpoint(servername, AUTHENTICATE_PATH, queryString);
    return response.json({redirect_url: endpoint});
  }

  token(request, response){
    let body = {
      grant_type: 'authorization_code',
      client_id: this.ifbConfig.client_id,
      client_secret: this.ifbConfig.client_secret,
      code: request.body.code,
      redirect_uri: request.body.redirect_uri
    }
    request.body = body;
    request.params[0] = TOKEN_PATH;
    this.sendRequest(request, response, "post");
  }


  sendRequest(request, response, method){
    const key = this.isOauthRequest(request)?'token':'data';
    let result = {};
    result[key] = null;
    axios(this.requestConfig(request, method))
      .then(res =>{
        result[key] = res.data
        return response.json(result);
      })
      .catch(err=>{
        let status = err.response.status;
        if(!status) status = err.response.httpStatus;
        if(!status) status = err.response.statusCode;
        response.status(status).json({ error: err.response.data })
      });
  }

  requestConfig(request, method){
    const servername = request.params.servername;
    const path = request.params[0];
    const body = request.body;
    let query = request.query;
    delete query.server;
    const endpoint = this.getEndpoint(servername, path, qs.stringify(query));
    let conf = {method: method, url: endpoint};

    let headers = {};
    if(method!='get') headers['Content-Type'] = this.isOauthRequest(request)?'application/x-www-form-urlencoded':'application/json';
    if(request.headers.authorization) headers['Authorization'] = request.headers.authorization;
    conf.headers = headers;
    if(body) conf.data = this.isOauthRequest(request)?qs.stringify(body): body;
    return conf;
  }

  getEndpoint(servername, path, queryString){
    const iformEnv = this.ifbConfig.iform_env?this.ifbConfig.iform_env:DEFAULT_ENV;
    const apiUrl = (path == TOKEN_PATH || path==AUTHENTICATE_PATH)?OAUTH_URL:API_URL;
    if(path[0]!='/') path = '/' + path;
    if(queryString) queryString = '?' + queryString;
    return (apiUrl + path + queryString).replace('{servername}', servername).replace('{iform_env}', iformEnv);
  }

  isOauthRequest(request){
    return request.params[0] == TOKEN_PATH || request.params[0] ==AUTHENTICATE_PATH;
  }
}

module.exports = APIController;

