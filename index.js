var XmlRpc = require('./lib/index');

var bla = new XmlRpc('api.random.org', '/json-rpc/1/invoke', true);
bla.call('generateIntegers', {
        "apiKey": "14f52dc9-00dc-445f-9293-999f6058538d",
        "n": 6,
        "min": 1,
        "max": 6,
        "replacement": true
    }).then(function(resp) { console.log('resp', resp) });