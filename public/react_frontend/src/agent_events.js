import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
//import commonStore from './stores/commonStore';
//import authStore from './stores/authStore';
superagent = superagentPromise(_superagent, global.Promise);
//
//create common url for api request site_api/type/id
const urlTypeId = (root, type,id) => `${root}/${type}/${id}`;

const returnResponseBody = res => res.body;
//
default export class agent_events {

	loadHeroEvents = (heroId) => superagent
									.get(`${getAPIRoot()}/events/hero/${heroId}`)
									.then(returnResponseBody)

	getAPIRoot = () => 'root_api'
						
}