import {_json} from "../../types";

export interface IVideoService{
    getVideo(id : string): Promise<any | Error>;
}

export type IVideoDetails={
    kind: string,
    etag: string,
    id: _json,
    snippet: _json,
}