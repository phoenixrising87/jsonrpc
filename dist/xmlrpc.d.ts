declare class XmlRpc {
    private host;
    private path;
    private https;
    constructor(host: string, path: string, https?: boolean);
    call(method: string, params: any): Promise<any>;
    private makeRequest(payload);
    private callback(response, resolve, reject);
}
export default XmlRpc;
