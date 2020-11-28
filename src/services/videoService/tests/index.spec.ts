import sinon from 'sinon';
import {VideoService} from "../index";
import {AxiosConfig} from "../../../config/axiosConfig";
import {nest} from "../../../utils";
import {expect} from "chai";
import {flaggedVideoDetails, videoDetailsRequest} from "./videoService.testFile";

let sandbox: sinon.SinonSandbox;
beforeEach(() => sandbox = sinon.createSandbox());
afterEach(() => sandbox.restore());

const axiosService = new AxiosConfig();
const videoService = new VideoService();
describe('Running test cases for VideoService', function (){
    describe('Running test cases for getVideo', function (){
        describe('Running positive test cases for getVideo', function (){
            it('should return videoList', async function (){
                const id = 'UCtR2jKyUUa3YFo-hbZunFTQ';
                const [err,videoList] = await nest(videoService.getVideo(id));
                if(err){
                    throw err;
                }
                expect(videoList).to.be.eql(videoDetailsRequest);
            })
        })
        describe('Running negative test cases for getVideo', function (){
            it('should return Error if id is not correct', async function (){
                const id = '1';
                const [err,videoList] = await nest(videoService.getVideo(id));
                expect(err).to.be.instanceOf(Error);
                if(err){
                    return true;
                }
                throw new Error('function throws error at wrong channel id');
            })
        })
    })
    describe('Running test cases for getFlaggedVideo', function () {
        describe('Running positive test cases for getFlaggedVideo', function () {
            it('should return videoList', async function () {
                const id = 'UCtR2jKyUUa3YFo-hbZunFTQ';
                const [err, videoList] = await nest(videoService.getFlaggedVideo(id));
                if (err) {
                    throw err;
                }
                expect(videoList).to.be.eql(flaggedVideoDetails);
            })
        })
        describe('Running negative test cases for getVideo', function () {
            it('should return Error if id is not correct', async function () {
                const id = '1';
                const [err, videoList] = await nest(videoService.getFlaggedVideo(id));
                expect(err).to.be.instanceOf(Error);
                if (err) {
                    return true;
                }
                throw new Error('function throws error at wrong channel id');
            })
        })
    })
})