# iformapi-lambda
 
A set of proxy functions for use in lambda and express server in general.

Usage (Amplify):
```
amplify init
amplify add api
--REST
--Create new Lambda function
--Serverless express function
--add path /api
--add path /token
```

```
npm install iformapi-lambda
```


In app.js
```
var iformapi = require('iformapi-lambda')

const client_id = 'XXXXXXXXXXXXXXXXXX'
const client_secret = 'XXXXXXXXXXXXXX'
const servername = '<yourservername>'
const ifbConfig = {
  client_id: client_id,
  client_secret: client_secret,
  servername: servername
}

app.get('/api', function(req,res){
  iformapi.get(ifbConfig, req, res)
});

app.post('/api', function(req,res){
  iformapi.post(ifbConfig, req, res)
});

app.put('/api', function(req,res){
  iformapi.put(ifbConfig, req, res)
});

app.delete('/api', function(req,res){
  iformapi.delete(ifbConfig, req, res)
});

app.post('/token', function(req,res){
  iformapi.getToken(ifbConfig, req, res)
});
```
