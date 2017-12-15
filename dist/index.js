"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const _ = require("lodash");
const concat = require("concat-stream");
class JsonRpc {
    constructor(host, path, https = false) {
        this.host = host;
        this.path = path;
        this.https = https;
    }
    call(method, params) {
        let payload = JSON.stringify({
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: _.uniqueId()
        });
        return this.makeRequest(payload);
    }
    makeRequest(payload) {
        let options = {
            host: this.host,
            path: this.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-rpc'
            }
        };
        return new Promise((resolve, reject) => {
            let req;
            if (this.https) {
                req = https.request(options, (response) => {
                    this.callback(response, resolve, reject);
                });
            }
            else {
                req = http.request(options, (response) => {
                    this.callback(response, resolve, reject);
                });
            }
            req.write(payload);
            req.end();
        });
    }
    callback(response, resolve, reject) {
        response.pipe(concat((body) => {
            try {
                var jsonResponse = JSON.parse(body.toString());
                resolve(jsonResponse);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = JsonRpc;
//# sourceMappingURL=index.js.map