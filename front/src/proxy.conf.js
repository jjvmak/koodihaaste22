
const PROXY_CONFIG = {
    "/api": {
      "target": "http://localhost:8080/",
      "onProxyRes": function(pr, req, res) {
       
       }
    },
      "logLevel": "info"
    };
  
module.exports = PROXY_CONFIG