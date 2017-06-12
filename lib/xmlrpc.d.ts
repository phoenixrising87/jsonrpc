declare class XmlRpc {
    private host;
    private path;
    private https;
    constructor(host: string, path: string, https?: boolean);
    call(method: string, params: any): Promise<string>;
    private makeRequest(payload);
    private callback(response, resolve, reject);
}
export default XmlRpc;
