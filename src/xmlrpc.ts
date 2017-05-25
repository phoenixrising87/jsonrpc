import * as http from "http";
import * as https from "https";
import * as _ from "lodash";
import concat = require("concat-stream");

class XmlRpc {

    public constructor(
        private host: string, 
        private path: string, 
        private https: boolean = false) {

    }

    public call(method: string, params: any): Promise<string> {
        let payload = JSON.stringify({
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: _.uniqueId()
        });
        return this.makeRequest(payload);
    }

    private makeRequest(payload: string): Promise<string> {
        let options = {
            host: this.host,
            path: this.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-rpc'
            }
        };
        return new Promise((resolve, reject) => {
            var req;
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

    private callback(response: http.IncomingMessage, resolve, reject): void {
        response.pipe(concat((body) => {
            try {
                var jsonResponse = JSON.parse(body.toString());
                resolve(jsonResponse);
            } catch (error) {
                reject(error);
            }
        }));
    }
}

module.exports = XmlRpc;