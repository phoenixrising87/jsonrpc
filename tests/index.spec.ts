import JsonRpc from './../src/index';
import * as http from "http";
import nock = require("nock");

describe('JsonRpc Client', () => {

    let host: string = '127.0.0.1:80';
    let path: string = '/';

    it('should have correct payload', () => {
        let method: string = 'test';
        let params: any = { username: "username", password: "password" };
        let expected = JSON.stringify({
            jsonrpc: '2.0',
            method: method,
            params: params
        });
        let expectedCapped = expected.replace(/^.|.$/g, '');
        let req = {
            write: jasmine.createSpy('write'),
            end: jasmine.createSpy('end')
        }

        spyOn(http, 'request').and.returnValue(req);

        let xmlRpcClient = new JsonRpc(host, path);
        xmlRpcClient.call(method, params);

        expect(req.write).toHaveBeenCalledWith(jasmine.stringMatching(expectedCapped));
    });

    it('should have correct options', () => {
        let expected = {
            host: host,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-rpc'
            }
        };
        let scope = nock(`http://${host}`)
            .post(path)
            .reply(200, "{}");

        spyOn(http, 'request').and.callThrough();

        let xmlRpcClient = new JsonRpc(host, path);
        xmlRpcClient.call('test', {});
        scope.done();
        
        expect(http.request).toHaveBeenCalledWith(jasmine.objectContaining(expected), jasmine.any(Function));
    });

    describe('http', () => {
        beforeEach(() => {
            host = '127.0.0.1:80';
        })

        it('should return response', () => {
            let scope = nock(`http://${host}`)
                .post(path)
                .reply(200, "{}");

            let xmlRpcClient = new JsonRpc(host, path);
            xmlRpcClient.call('test', {}).then((response) => {
                expect(response).toEqual({});
            });

            scope.done();
        });

        it('should catch json parse error', () => {
            let scope = nock(`http://${host}`)
                .post(path)
                .reply(200, "string");

            let xmlRpcClient = new JsonRpc(host, path);
            xmlRpcClient.call('test', {}).catch((err) => {
                expect(err).toBeDefined();
            });

            scope.done();
        });
    });

    describe('https', () => {
        beforeEach(() => {
            host = '127.0.0.1:443';
        })

        it('should return response', () => {
            let scope = nock(`https://${host}`)
                .post(path)
                .reply(200, "{}");

            let xmlRpcClient = new JsonRpc(host, path, true);
            xmlRpcClient.call('test', {}).then((response) => {
                expect(response).toEqual({});
            });

            scope.done();
        });

        it('should catch json parse error', () => {
            let scope = nock(`https://${host}`)
                .post(path)
                .reply(200, "string");

            let xmlRpcClient = new JsonRpc(host, path, true);
            xmlRpcClient.call('test', {}).catch((err) => {
                expect(err).toBeDefined();
            });

            scope.done();
        });
    });
});