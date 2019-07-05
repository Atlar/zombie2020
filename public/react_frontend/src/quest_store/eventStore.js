import { observable, action } from 'mobx';
//import agent from '../agent';
import agent_events from '../agent_events';
import StoreComponent from "../common_store/StoreComponent";
import { observer } from 'mobx-react';

export default class EventStore extends StoreComponent{

  @observable events;

  @action loadEvents(){
     //this.loadingHero = true;
     //send hero api request
     var agent = this.parent.agent_events;
     return agent.loadHeroEvents( this.parent.heroStore.currentHero.name )
     .then(action( (events)  => { this.events = events; console.log(this.events) }))

 } 
  
}