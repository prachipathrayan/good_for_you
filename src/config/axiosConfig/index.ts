import {nest} from "../../utils";
import axios from "axios";
import logger from "@shared/Logger";
import {IAxiosConfig} from "./types";
import config from "../index";

export class AxiosConfig implements IAxiosConfig{
    private static key : string = config.key;
    async videoInstanceForNextPage(id : string, pageToken: string): Promise< any |Error>{
        let err: Error;
        let res: any;
        // eslint-disable-next-line max-len
        [err, res]= await nest(axios.get(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${id}&maxResults=50&key=${AxiosConfig.key}&pageToken=${pageToken}`));
        if(err){
            logger.error('Error in getting response',{error: err});
            throw new Error('Error in getting response');
        }
        return res.data;

    }
    async videoInstance(id : string): Promise< any |Error>{
        let err: Error;
        let res: any;
        // eslint-disable-next-line max-len
        [err, res]= await nest(axios.get(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${id}&maxResults=50&key=${AxiosConfig.key}`));
        if(err){
            logger.error('Error in getting response',{error: err});
            throw new Error('Error in getting response');
        }
        return res.data;

    }
    async channelInstance(username : string): Promise< any |Error>{
        let err: Error;
        let res: any;
        // eslint-disable-next-line max-len
        [err, res]= await nest(axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${username}&key=${AxiosConfig.key}`));
        if(err){
            logger.error('Error in getting response',{error: err});
            throw new Error('Error in getting response');
        }
        return res.data;

    }
}