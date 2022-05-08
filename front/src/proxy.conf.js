
const PROXY_CONFIG = {
    "/api": {
      "target": "http://localhost:8080/",
      "onProxyRes": function(pr, req, res) {
        // console.log(res.cookie);
       
       }
    },
      "logLevel": "info"
    };
  
module.exports = PROXY_CONFIG