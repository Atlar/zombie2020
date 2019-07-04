import { observable, action } from 'mobx';
//import agent from '../agent';
import agent_events from '../agent_events';

export default class EventStore {

  parent;
  agent_events = new agent_events();
  @observable events;


  constructor(parent){
    this.parent = parent;
    this.agent_events.appSettings = parent.appSettings;
  }

  @action loadEvents(){
     //this.loadingHero = true;
     //send hero api request
     return agent_events.loadHeroEvents( this.parent.heroStore.currentHero.name )
     .then(action(({ events }) => { this.events = events; }))

 } 
  
}