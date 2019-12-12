var axios = require('axios')
var qs = require('qs')

function get(ifbConfig, req, res){
    const query = req.query
    const path = query.path
    delete query.path
  
    const token = req.headers.authorization
  
    const conf = {
      headers: {
        'Authorization': token
      }
    }
  
    console.log ("===Parameters===")
    console.log(req.query)
    console.log("===Path::["+path+"]")
    console.log("===Token::["+token+"]")
  
    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path+'?'+qs.stringify(query)
  
    console.log("==Encoded URL::["+encodedUrl+"]")
  
    axios.get(encodedUrl, conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
      console.log(err.response.data)
      res.json({
        error: err.response.data
      })
    })
  }

function _delete(ifbConfig, req, res){
    const query = req.query
    const path = query.path
    delete query.path
  
    const token = req.headers.authorization
  
    const conf = {
      headers: {
        'Authorization': token
      }
    }
  
    console.log ("===Parameters===")
    console.log(req.query)
    console.log("===Path::["+path+"]")
    console.log("===Token::["+token+"]")
  
    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path+'?'+qs.stringify(query)
  
    console.log("==Encoded URL::["+encodedUrl+"]")
  
    axios.delete(encodedUrl, conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
      console.log(err.response.data)
      res.json({
        error: err.response.data
      })
    })
  }

  function post(ifbConfig, req, res){
    const body = req.body
    const path = body.path
    delete body.path
  
    const token = req.headers.authorization
  
    const conf = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'

      }
    }
  
    console.log ("===Body===")
    console.log(body)
    console.log("===Path::["+path+"]")
    console.log("===Token::["+token+"]")
  
    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path
  
    console.log("==Encoded URL::["+encodedUrl+"]")
  
    axios.post(encodedUrl,body,conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
      console.log(err.response.data)
      res.json({
        error: err.response.data
      })
    })
  }

  function put(ifbConfig, req, res){
    const body = req.body
    const path = body.path
    delete body.path
  
    const token = req.headers.authorization
  
    const conf = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'

      }
    }
  
    console.log ("===Body===")
    console.log(body)
    console.log("===Path::["+path+"]")
    console.log("===Token::["+token+"]")
  
    const encodedUrl = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/'+path
  
    console.log("==Encoded URL::["+encodedUrl+"]")
  
    axios.put(encodedUrl,body,conf)
    .then(response =>{
      const data = response.data
      res.json({
        data: data
      })
    })
    .catch(err=>{
      console.log(err.response.data)
      res.json({
        error: err.response.data
      })
    })
  }


  function getToken(ifbConfig, req, res){

    const param = {
      code: req.body.code,
      access_type: 'online',
      grant_type: 'authorization_code',
      redirect_uri: req.body.redirect_uri
    }
    console.log("===Param===")
    console.log(param)
    const conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: ifbConfig.client_id,
        password: ifbConfig.client_secret
      }
    }
    console.log("===Conf===")
    console.log(conf)
    const url = 'https://'+ifbConfig.servername+'.iformbuilder.com/exzact/api/oauth/token'
  
    console.log("==URL::["+url+"]")
  
    axios.post(url,qs.stringify(param), conf )
    .then( response =>{
      const token = response.data
      res.json({
        success: 'get access_token succeed!',
        token: token
      })
  
    })
    .catch(err=>{
      res.json({
        error: err.data,
        token: null
      })
    })
  
  }

  module.exports = {
      getToken: getToken,
      get: get,
      post: post,
      put: put,
      delete: _delete
  }
