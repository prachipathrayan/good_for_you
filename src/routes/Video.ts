import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import {nest} from "../utils";
import logger from '@shared/Logger';
import {VideoService} from "../services/videoService";
import {IVideoDetails} from "../services/videoService/types";

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

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

export default router;
