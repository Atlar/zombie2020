
import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './components/App';

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

import {userStoreProject} from './stores_project/userStore';
import {projectStoreProject} from './stores_project/projectStore';

import BookshelfApp from './ComponentsBookshelf/BookshelfApp';

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
appStatus.appName="Bookshelf";
appStatus.APIRootURL="/api";
//////
const adventureStores = new StoreComponent();
adventureStores.addComponent( "appStatusStore", appStatus);
adventureStores.addComponent( "heroStore", new heroStore()) ;
adventureStores.addComponent( "eventStore",new eventStore()) ;
adventureStores.addComponent( "agent_object", new agent_object()) ;
adventureStores.addComponent( "agent_events", new agent_events());

//////////////////////////
adventureStores.heroStore.currentHero = { name: "Hedrick ", level: 1};
//////SETUP GLOBAL STORE///

//bookshelf store
const BookshelfStore = new StoreComponent();
BookshelfStore.addComponent( "userStore", new userStoreProject() );
BookshelfStore.addComponent( "projectStore", new projectStoreProject());
BookshelfStore.addComponent( "appStatusStore", appStatus);
//
BookshelfStore.userStore.currentUserId = 1;

BookshelfStore.userStore.users = [
{Name : "Chris" },
{Name : "Gregor"}
];

/////////////////////////////

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
//useStrict(false);

ReactDOM.render((
  <Provider store={BookshelfStore}>
    <HashRouter>
      <BookshelfApp/>
    </HashRouter>
  </Provider>
), document.getElementById('root'));