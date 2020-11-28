export interface IAxiosConfig{
    videoInstance(id : string): Promise< any |Error>;
    channelInstance(username : string): Promise< any |Error>;
    getKeyValue() : Promise<string | Error>;
}