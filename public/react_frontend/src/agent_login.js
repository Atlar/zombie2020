import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import StoreComponent from "./common_store/StoreComponent";
//sends login request and register request.

const superagent = superagentPromise(_superagent, global.Promise);
//
//create common url for api request site_api/type/id
const urlTypeId = (root, type,id) => `${root}/${type}/${id}`;

const returnResponseBody = res => { console.log(res.body); return res.body;}
//
export default class agent_login extends StoreComponent{
	
	login(){
	   superagent.get(`${this.getAPIRoot()}/login`)
	  .then(returnResponseBody);
	}

	getAPIRoot = () => this.parent.appStatusStore.APIRootURL;
						
}