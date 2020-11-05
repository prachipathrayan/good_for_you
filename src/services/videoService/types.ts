export interface IVideoService{
    getVideo(id : string): Promise<any | Error>;
}