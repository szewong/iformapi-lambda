const APIController = require('./controller');
const express = require('express');

class IformAPI{
  constructor(config){
    this.controller = new APIController(config);
    this.init();
  }

  init(){
    let _this = this;
    this.router = express.Router();

    const validateServerName = (req, res, next) => {
      if(req.params.servername) next();
      else return res.status(403).json({message: "servername is required!"});
    }

    this.router.get('/echo', function(req, res, next){
      res.json({result: "iformapi initiated!"});
    });

    this.router.get('/:servername/authenticate', validateServerName, (req, res, next) => {
      _this.controller.authenticate(req, res);
    });

    this.router.post('/:servername/token', validateServerName, (req, res, next) => {
        _this.controller.token(req, res);
    });

    this.router.get('/:servername/api/*', validateServerName, function(req, res, next){
       _this.controller.get(req, res);
    });

    this.router.post('/:servername/api/*', validateServerName, function(req,res, next){
      _this.controller.post(req, res);
    });

    this.router.put('/:servername/api/*', validateServerName, function(req, res, next){
      _this.controller.put(req, res);
    });

    this.router.delete('/:servername/api/*', validateServerName, function(req, res, next){
      _this.controller.delete(req, res);
    });
  }
}

module.exports = IformAPI;