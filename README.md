# JSON-RPC-Client

This project is about a simple JSON-RPC (2.0) client written in TypeScript.

## Usage

The basic way is to use the client with the http protocol. What is needed is the hostname/ip and a path to create the client. After instanciating the *call* is used to execute the request with the method and the payload.

```
import JsonRpcClient from 'json-rpc-client';

var client = new JsonRpcClient('127.0.0.1', '/');
client.call('Session.login', { username: 'admin', password: 'password' });
```

This is how the request will look like
```
POST http://127.0.0.1 { "jsonrpc": "2.0", "method": "Session.login", "params": { "username": "admin", "password": "password" }, "id": "1" }
```

Additionally it is also possible to use the client with https
```
var client = new JsonRpcClient('127.0.0.1', '/', true);
```

## Developing

### Requirements
As requirement for this project it is needed to have TypeScript installed globally
```
npm install typescript -g
```

### Setup
Clone the repository to your local machine, enter the folder and install the needed npm packages.
```
npm install
```

### Watcher
To let the TypeScript compiler watch for changes run
```
npm dev
```

## Running the tests
Tests are written with Jasmine. To exectue them run 
```
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details