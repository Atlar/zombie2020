import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import StoreComponent from "./common_store/StoreComponent";
//import commonStore from './stores/commonStore';
//import authStore from './stores/authStore';
const superagent = superagentPromise(_superagent, global.Promise);
//
//create common url for api request site_api/type/id
const urlTypeId = (root, type,id) => `${root}/${type}/${id}`;

const returnResponseBody = res => { alert(JSON.stringify(res.body) );return res.body;}
//
export default class agent_events extends StoreComponent{

	loadHeroEvents = (heroId) => superagent
									.get(`${this.getAPIRoot()}/events/hero/${heroId}`)
									.accept('json')
									.then(returnResponseBody);

	getAPIRoot = () => this.parent.appStatusStore.APIRootURL;
						
}