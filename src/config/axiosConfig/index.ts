import {nest} from "../../utils";
import axios from "axios";
import logger from "../../utils/logger";
import {IAxiosConfig} from "./types";
import APIKeyConfig from "../index";
import {_json} from "../../types";

export class AxiosConfig implements IAxiosConfig{

    async getKeyValue() : Promise<string | Error>{
        let key : string;
        if(!APIKeyConfig.key){
            logger.error('Error in getting your API key', {error : "Error in getting your API key"});
            throw new Error('Error in getting your API key');
        }
        else{
            key = APIKeyConfig.key;
        }
        return key;
    }


    async videoInstanceForNextPage(id : string, pageToken: string): Promise< _json |Error>{
        let err: Error;
        let res: _json;
        let key: string;
        let notKey : null;
        [notKey, key]= await nest(this.getKeyValue());
        if(notKey){
            logger.error('error in getKeyValue Function', {error : notKey});
        }
        // eslint-disable-next-line max-len
        [err, res]= await nest(axios.get(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${id}&maxResults=50&key=${key}&pageToken=${pageToken}`));
        if(err){
            logger.error('Error in getting response',{error: err});
            throw new Error('Error in getting response');
        }
        return res.data;

    }
    async videoInstance(id : string): Promise< _json |Error>{
        let err: Error;
        let res: _json;
        let key: string;
        let notKey : null;
        [notKey, key]= await nest(this.getKeyValue());
        if(notKey){
            logger.error('error in getKeyFunction', {error : notKey});
        }
        // eslint-disable-next-line max-len
        [err, res]= await nest(axios.get(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${id}&maxResults=50&key=${key}`));
        if(err){
            logger.error('Error in getting response',{error: err});
            throw new Error('Error in getting response');
        }

        return res.data;

    }
    async channelInstance(username : string): Promise< _json |Error>{
        let err: Error;
        let res: _json;
        let key: string;
        let notKey : null;
        [notKey, key]= await nest(this.getKeyValue());
        if(notKey){
            logger.error('error in getKeyFunction', {error : notKey});
        }
        // eslint-disable-next-line max-len
        [err, res]= await nest(axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${username}&key=${key}`));
        if(err){
            logger.error('Error in getting response',{error: err});
            throw new Error('Error in getting response');
        }
        return res.data;

    }
}