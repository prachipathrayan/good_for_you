import { nest } from '../../utils';
import logger from '@shared/Logger';
import {IVideoService} from './types';
import {AxiosConfig} from "../../config/axiosConfig";

export class VideoService implements IVideoService{

    private channelName = {
        "ThePrint" : "UCuyRsHZILrU7ZDIAbGASHdA",
        "WSJDigitalNetwork" : "UCK7tptUDHh-RYDsdxO1-5QQ",
        "TheNewYorkTimes" : "UCqnbDFdCpuN8CMEg0VuEBqA",
        "FinancialTimesVideos" : "UCoUxsWakJucWg46KW5RsvPw",
        "ndtvindia" : "UC9CYT9gSNLevX5ey2_6CK0Q"
    };

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
    async getVideo(id : string): Promise<any | Error> {
        let err: Error;
        let res: any;
        [err, res] = await nest(this.axiosService.videoInstance(id));
        if (err) {
            logger.error('Error in fetching data for the function', {error: err});
            throw new Error('Error in fetching data for the function');
        }
        return res;
    }
}