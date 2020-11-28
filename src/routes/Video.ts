import { Request, Response, Router } from 'express';
import {nest} from "../utils";
import logger from '../utils/logger';
import {VideoService} from "../services/videoService";
import {IVideoDetails} from "../services/videoService/types";
import {_json} from "../types";

const router = Router();

router.get('/:id', async (req, res)=>{
    const videoService= new VideoService();
    let videoItem: IVideoDetails[];
    let err: Error;
    const id : string  = req.params.id;
    [err, videoItem]= await nest(videoService.getVideo(id));
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
    }
    return res.json({
        APIType: 'Video Details',
        data: videoItem,
        error: null

    });
});

router.get('/:id/getVideoType', async (req, res)=>{
    const videoService= new VideoService();
    let videoItem: IVideoDetails[];
    let err: Error;
    const id : string  = req.params.id;
    [err, videoItem]= await nest(videoService.getFlaggedVideo(id));
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
    }
    let contentPercentage : _json;
    let error : Error;
    [error , contentPercentage]= await nest(videoService.getContentPercentage());
    if(error){
        logger.error('error in getContentPercentage', {error : error});
        throw new Error('error in getContentPercentage');
    }
    return res.json({
        APIType: 'Video Details with flag',
        contentPercentage: contentPercentage,
        data: videoItem,
        error: null

    });
});

export default router;
