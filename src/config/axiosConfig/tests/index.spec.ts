import {AxiosConfig} from "../index";
import { expect } from 'chai';
import {describe} from "mocha";
import APIKeyConfig from "../../index";
import sinon from'sinon';
import axios from 'axios';
import {requestResult} from "./axios.service.test";
import {nest} from "../../../utils";


const axiosConfig = new AxiosConfig();

let sandbox: sinon.SinonSandbox;
beforeEach(() => sandbox = sinon.createSandbox());
afterEach(() => sandbox.restore());

describe('Running test cases for AxiosConfig', function (){
    describe('Running test case for getKeyValue function', function (){
        describe('Running positive test cases for getKeyValue function', function (){
            it('should return user key when there is no error', async function (){
                const key  = await axiosConfig.getKeyValue();
                expect(key).to.be.equal(APIKeyConfig.key);

            })
        })
    })

    describe('Running test cases for videoInstance Function', function (){
        describe('Running positive test cases for videoInstance function', function (){
            it('should return video list of next page', async function (){
                const data = new Promise((r) => r({ data : requestResult }));
                const id = 'UCtR2jKyUUa3YFo-hbZunFTQ';
                sandbox.stub(axios, 'get').returns(data);
                const [err,actualResult] = await nest(axiosConfig.videoInstanceForNextPage(id,id));
                if(err){
                    throw err;
                }
                expect(actualResult).to.be.equal(requestResult);
            })
        })
    })
    describe('Running test cases for videoInstance Function', function (){
        describe('Running positive test cases for videoInstance function', function (){
            it('should return video list', async function (){
                const data = new Promise((r) => r({ data : requestResult }));
                const id = 'UCtR2jKyUUa3YFo-hbZunFTQ';
                sandbox.stub(axios, 'get').returns(data);
                const [err,actualResult] = await nest(axiosConfig.videoInstance(id));
                if(err){
                    throw err;
                }
                expect(actualResult).to.be.equal(requestResult);
            })
        })
    })
    describe('Running test cases for videoInstance Function', function (){
        describe('Running positive test cases for videoInstance function', function (){
            it('should return channel list', async function (){
                const data = new Promise((r) => r({ data : requestResult }));
                const username = 'UCtR2jKyUUa3YFo-hbZunFTQ';
                sandbox.stub(axios, 'get').returns(data);
                const [err,actualResult] = await nest(axiosConfig.channelInstance(username));
                if(err){
                    throw err;
                }
                expect(actualResult).to.be.equal(requestResult);
            })
        })
    })
})