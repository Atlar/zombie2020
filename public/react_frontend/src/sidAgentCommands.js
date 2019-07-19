import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import StoreComponent from "./common_store/StoreComponent";
//agent to send any object by standart api
//
//create common url for api request site_api/type/id
const urlTypeId = (root, type,id) => `${root}/${type}/${id}`;
const urlAddress = (root, address) => {console.log(`${root}/${address}`);return `${root}/${address}`;} 

const returnResponseBody = res =>{ return res.body;  }

//this is singleton top store component
//provides list of commands 
export default class SidAgentCommands extends StoreComponent{


    getRootAPIUrl = () => this.parent.appStatusStore.APIRootURL;

    superagent = superagentPromise(_superagent, global.Promise);

    CreateInAggregation = (aggregation,id, field,object) => superagent.post(`${this.getRootAPIUrl()}/${aggregation}/${id}/${field}`,object)
                          .accept('json')
                          .then(returnResponseBody);
                          
    UpdateAggregationByAggregatorId = (aggregation, subject , aggregatorId) => superagent.get(`${this.getRootAPIUrl()}/${aggregation}/${aggregatorId}/${subject}`)
                          .accept('json')
                          .then(returnResponseBody);
}