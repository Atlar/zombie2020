

import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import AdventureApp from './componentsAdventure/AdventureApp';
import appStatusStore from './common_store/appStatusStore';
import heroStore from "./quest_store/heroStore";
import eventStore from "./quest_store/eventStore";
import StoreComponent from "./common_store/StoreComponent";

import articlesStore from './stores/articlesStore';
import commentsStore from './stores/commentsStore';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import editorStore from './stores/editorStore';
import userStore from './stores/userStore';
import profileStore from './stores/profileStore';



//better because no need to initialize
const stores = {
  articlesStore,
  commentsStore,
  authStore,
  commonStore,
  editorStore,
  userStore,
  profileStore,
};
//////SETUP///////////////
appStatusStore.appName="Quest";
appStatusStore.APIRootURL="/api";

//////////////////////////

//////SETUP GLOBAL STORE///
class adventureStores extends StoreComponent{

  appStatusStore = this.CreateComponent(appStatusStore);
  heroStore = this.CreateComponent(heroStore);
  eventStore = this.CreateComponent(eventStore);

  agent_events = this.CreateComponent(agent_events);
  agent_object = this.CreateComponent(agent_object);

}
const adventureStores = new adventureStores();
/////////////////////////////

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
//useStrict(true);

ReactDOM.render((
  <Provider stores = {adventureStores}>
  <div>App Header</div>
    <HashRouter>
      <AdventureApp />
    </HashRouter>
  </Provider>
), document.getElementById('root'));