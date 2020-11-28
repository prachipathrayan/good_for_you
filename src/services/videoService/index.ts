import { nest } from '../../utils';
import logger from '../../utils/logger';
import {IVideoDetails, IVideoDetailsWithFlag, IVideoService} from './types';
import {AxiosConfig} from "../../config/axiosConfig";
import {_json} from "../../types";
import {keywords} from "./wordList";

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
        while (pageToken != null) {
            [err, res] = await nest(this.axiosService.videoInstanceForNextPage(id, pageToken));
            if (err) {
                logger.error('Error in fetching data for the function', {error: err});
                throw new Error('Error in fetching data for the function');
            }
            this.addVideoDetails(res);
            pageToken = res.nextPageToken;
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

    private listOfVideosWithFlag = new Array<IVideoDetailsWithFlag>();
    private countAntiOpposition : number = 0;
    private countAntiGovernment : number = 0;

    async getFlaggedVideo(id : string): Promise<IVideoDetailsWithFlag[] | Error>{
        let error:Error;
        let videoList:IVideoDetails[];
        [error, videoList]=await nest(this.getVideo(id));
        if(error){
            logger.error('Error in fetching videos',{error: error});
            throw new Error('Error in fetching videos');
        }
        for (const item of videoList) {
            let res: RegExpMatchArray;
            let notRes:null;
            let flag:string;
            [notRes,res]= await nest(this.searchKeywords(item.snippet.title));
            if(!res){
                [notRes,res]=await nest(this.searchKeywords(item.snippet.description));
                if(!res){
                    flag="anti-opposition";
                    this.countAntiOpposition++;
                }
                else{
                    flag="anti-government";
                    this.countAntiGovernment++;
                }
            }
            else{
                flag="anti-government";
                this.countAntiGovernment++;
            }
            this.listOfVideosWithFlag.push({
                videoDetail: item,
                flag: flag,
            })
        }
        return this.listOfVideosWithFlag;
    }

    async getContentPercentage(): Promise<_json>{
        const percentageOfAntiGovernmentContent : number = (this.countAntiGovernment/(this.countAntiGovernment+this.countAntiOpposition))*100;
        const percentageOfAntiOppositionContent : number = 100 - percentageOfAntiGovernmentContent;
        let countList : _json = {
            "antiGovernmentContent" : percentageOfAntiGovernmentContent,
            "antiOppositionContent" : percentageOfAntiOppositionContent,
        }
        return countList;
    }

    async searchKeywords (stringToBeSearched : string): Promise<RegExpMatchArray | null> {
        let keys = keywords
        let re = new RegExp('(' + keys.join('|') + ')', 'g')

        return stringToBeSearched.toLowerCase().match(re)
    }
}