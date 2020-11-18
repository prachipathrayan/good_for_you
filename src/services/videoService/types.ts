import {_json} from "../../types";

export interface IVideoService{
    getVideo(id : string): Promise<any | Error>;
    getFlaggedVideo(id : string): Promise<IVideoDetailsWithFlag[] | Error>;
    getContentPercentage(): Promise<_json>;
}

export type IVideoDetails={
    kind: string,
    etag: string,
    id: _json,
    snippet: _json,
}

export type IVideoDetailsWithFlag={
    videoDetail: IVideoDetails,
    flag: string,
}
