var request = require('request');

var API_KEY = 'bf559be38be02fe5af32e98737493766';

function invoke(options){
    return new Promise(function(resolve, reject) {
        var req_options = {
            url: options.url,
            method: options.method,
            headers: {
                'user-key': API_KEY,
            },
        };

        request(req_options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    resolve(JSON.parse(body));      // if the object is stringified, then parse it and return
                } catch (e) {
                    resolve(body);                  // if it is in object form(not stringified), then simply return it.
                }
            } else {
                reject({
                    
                });
            }
        });
    });
}

module.exports = {
    invoke
}
