import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
//import commonStore from './stores/commonStore';
//import authStore from './stores/authStore';
const superagent = superagentPromise(_superagent, global.Promise);
//
//create common url for api request site_api/type/id
const urlTypeId = (root, type,id) => `${root}/${type}/${id}`;

const returnResponseBody = res => res.body;
//
export default class agent_events {

	appSettings;

	loadHeroEvents = (heroId) => superagent
									.get(`${getAPIRoot()}/events/hero/${heroId}`)
									.then(returnResponseBody)

	getAPIRoot = () => this.appSettings.APIRootURL;
						
}