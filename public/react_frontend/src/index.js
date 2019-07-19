
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

import {default as userStoreProject} from './stores_project/userStore';
import {default as projectStoreProject} from './stores_project/projectStore';
import EntryStore from './stores_project/entryStore';
import LoginStore from './stores_project/loginStore';
import AddEntryStore from './stores_project/entryAddStore';
//net
import SidAgent from './sidAgent';
import SidAgentCommands from './sidAgentCommands';
//functional components
import Drafter from './common_store/Drafter';

import BookshelfApp from './ComponentsBookshelf/BookshelfApp';
import EntryAddStore from './stores_project/entryAddStore';


console.log("console...");
console.error("console...");
console.info("console...");
console.debug("console...");
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
appStatus.APIRootURL="/api/bookshelf";
/////
/*
const adventureStores = new StoreComponent();
adventureStores.addComponent( "appStatusStore", appStatus);
adventureStores.addComponent( "heroStore", new heroStore()) ;
adventureStores.addComponent( "eventStore",new eventStore()) ;
adventureStores.addComponent( "agent_object", new agent_object()) ;
adventureStores.addComponent( "agent_events", new agent_events());

//////////////////////////
adventureStores.heroStore.currentHero = { name: "Hedrick ", level: 1};
*/
//////SETUP GLOBAL STORE///

//bookshelf store
const BookshelfStore = new StoreComponent();
//alert(JSON.stringify( BookshelfStore) );
//alert("is defined? " + BookshelfStore);
const UserStoreRef = new userStoreProject();
const sidAgent = new SidAgent();
const sidAgentCommands = new SidAgentCommands();
//alert( "us st " + UserStoreRef );
BookshelfStore.addComponent( "userStore", new userStoreProject() );
//alert(JSON.stringify( BookshelfStore) );
BookshelfStore.addComponent( "projectStore", new projectStoreProject());
//alert(JSON.stringify( BookshelfStore) );
BookshelfStore.addComponent( "appStatusStore", appStatus);
//alert(JSON.stringify( BookshelfStore) );
BookshelfStore.addComponent( "entryStore", new EntryStore());
BookshelfStore.addComponent( "agent_object", new agent_object()) ;
BookshelfStore.addComponent( "loginStore", new LoginStore()) ;
BookshelfStore.addComponent( "entryAddStore", new EntryAddStore()) ;
//net agent setup
//BookshelfStore.addComponent( "Agent", sidAgent) ;
BookshelfStore.addComponent( "AgentCommands", sidAgentCommands) ;

//setup stores components
const projectDrafter = new Drafter();
projectDrafter.draftPrototype = {
    Name: "New Project",
    Entries: [],
    Participants: [] };
const projectAgent = new SidAgent();
projectAgent.commands = sidAgentCommands;
BookshelfStore.projectStore.addComponent( "Drafter", projectDrafter);
BookshelfStore.projectStore.addComponent( "Agent", projectAgent);
BookshelfStore.projectStore.Agent.commands = sidAgentCommands;


console.log("store configured. creating test data...");
BookshelfStore.userStore.currentUserId = 1;

BookshelfStore.userStore.users = [
{Name : "Chris" },
{Name : "Gregor"},
{Name : "William"}
];

BookshelfStore.projectStore.projects = [
    {Name: "MyProject", 
     Entries:[0,1],
     Participants:[
     {
     User: 1,
     Role: "admin"
     },
     {
     User: 0,
     Role: "publisher"
     }
     ] 
    }, 
    {Name: "Trivol Project" , 
     Entries:[3],
     Participants:[
     {
     User: 0,
     Role: "admin"
     },
     {
     User: 2,
     Role: "writer"
     }
     ] 
    }, 
    {Name: "Aqua general",
     Entries:[2],
     Participants:[
        {
           User: 2,
           Role: "admin"
        },
        {
           User: 1,
           Role: "writer"
        }
     ] 
    }, 
];
BookshelfStore.projectStore.currentProjectId = 0;

BookshelfStore.entryStore.entries = [
{Title: "Use this entry" },
{Title: "Chapter 1" },
{Title: "Guide to create substantive text" },
{Title: "Empty text is cool" }
];

console.log("store initialized and set");
/////////////////////////////

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
//useStrict(false);
//alert("render root" );
ReactDOM.render((
  <Provider store={BookshelfStore}>
    <HashRouter>
      <BookshelfApp/>
    </HashRouter>
  </Provider>
), document.getElementById('root'));