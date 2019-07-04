
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

import agent_object from './quest_store/agent_object';
import agent_events from './agent_events';

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
const appStatus = new appStatusStore();
appStatus.appName="Quest";
appStatus.APIRootURL="/api";
//////
const adventureStores = new StoreComponent();
adventureStores.addComponent(appStatus);
adventureStores.addComponent( new heroStore()) ;
adventureStores.addComponent( new eventStore()) ;
adventureStores.addComponent( new agent_object()) ;
adventureStores.addComponent( new agent_events());

//////////////////////////

//////SETUP GLOBAL STORE///

/////////////////////////////
alert("setting store done");
// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
//useStrict(false);
alert("rendering");
ReactDOM.render((
  <Provider stores = {adventureStores}>
  <div>App Header</div>
    <HashRouter>
      <AdventureApp />
    </HashRouter>
  </Provider>
), document.getElementById('root'));