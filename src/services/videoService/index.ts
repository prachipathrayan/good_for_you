import { nest } from '../../utils';
import logger from '@shared/Logger';
import {IVideoDetails, IVideoService} from './types';
import {AxiosConfig} from "../../config/axiosConfig";
import {_json} from "../../types";

export class VideoService implements IVideoService{

    private channelName = {
        "ThePrint" : "UCuyRsHZILrU7ZDIAbGASHdA",
        "WSJDigitalNetwork" : "UCK7tptUDHh-RYDsdxO1-5QQ",
        "TheNewYorkTimes" : "UCqnbDFdCpuN8CMEg0VuEBqA",
        "FinancialTimesVideos" : "UCoUxsWakJucWg46KW5RsvPw",
        "ndtvindia" : "UC9CYT9gSNLevX5ey2_6CK0Q"
    };

    private listOfVideos = new Array<IVideoDetails>();
    private axiosService= new AxiosConfig();
    // async getChannel(): Promise<any | Error>{
    //     let err: Error;
    //     let res: any;
    //     [err, res] = await nest(channelInstance());
    //     if (err) {
    //         logger.error('Error in fetching data for the function', {error: err});
    //         throw new Error('Error in fetching data for the function');
    //     }
    //     return res;
    // }
    async getVideo(id : string): Promise<IVideoDetails[] | Error> {
        let err: Error;
        let res: any;
        let pageToken : string;
        [err, res] = await nest(this.axiosService.videoInstance(id));
        if (err) {
            logger.error('Error in fetching data for the function', {error: err});
            throw new Error('Error in fetching data for the function');
        }
        this.addVideoDetails(res);
        pageToken = res.nextPageToken;
        while (1) {
            [err, res] = await nest(this.axiosService.videoInstanceForNextPage(id, pageToken));
            if (err) {
                logger.error('Error in fetching data for the function', {error: err});
                throw new Error('Error in fetching data for the function');
            }
            this.addVideoDetails(res);
            pageToken = res.nextPageToken;
            if (pageToken == null) {
                break;
            }
        }
        return this.listOfVideos;
    }

    addVideoDetails(res : _json){
        res.items.forEach((item : {kind: string, etag: string, id: _json, snippet: _json,})=> {
            this.listOfVideos.push({
                kind: item.kind,
                etag: item.etag,
                id: item.id,
                snippet: item.snippet,
            });
        });
    }
}