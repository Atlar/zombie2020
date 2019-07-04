
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
//appStatusStore.appName="Quest";
//appStatusStore.APIRootURL="/api";

//////////////////////////
alert(appStatusStore);
//////SETUP GLOBAL STORE///
class adventureStore extends StoreComponent{

/*
  appStatusStore = this.CreateComponent(appStatusStore);
  heroStore = this.CreateComponent(heroStore);
  eventStore = this.CreateComponent(eventStore);

  agent_events = this.CreateComponent(agent_events);
  agent_object = this.CreateComponent(agent_object);
  */

}
alert("store defined");
alert("store defined");
const adventureStores = new adventureStore({parent: "a"});
alert(appStatusStore);
adventureStores.appStatusStore = adventureStores.CreateComponent(appStatusStore);
alert("app status");
adventureStores.heroStore = adventureStores.CreateComponent(heroStore);
alert("hero store");
  adventureStores.eventStore = adventureStores.CreateComponent(eventStore);
alert("event store");
 adventureStores.agent_events = adventureStores.CreateComponent(agent_events);
 alert("agent event created");
 adventureStores.agent_object = adventureStores.CreateComponent(agent_object);
alert("agent object created");

adventureStores.appStatusStore.appName="Quest";
adventureStores.appStatusStore.APIRootURL="/api";
/////////////////////////////
alert("settings done");
// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
useStrict(false);
alert("rendering");
ReactDOM.render((
  <Provider stores = {adventureStores}>
  <div>App Header</div>
    <HashRouter>
      <AdventureApp />
    </HashRouter>
  </Provider>
), document.getElementById('root'));