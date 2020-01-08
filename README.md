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
var IformAPI = require('iformapi-lambda');

const client_id = 'XXXXXXXXXXXXXXXXXX'
const client_secret = 'XXXXXXXXXXXXXX'
const ifbConfig = {
  client_id: client_id,
  client_secret: client_secret,
}

const iformApi = new IformAPI(ifbConfig);
app.use('/iform', iformApi.router);
```
