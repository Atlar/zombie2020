import { observable, action } from 'mobx';
//import agent from '../agent';
import agent_events from '../agent_events';
import StoreComponent from "../common_store/StoreComponent";
import { observer } from 'mobx-react';

export default class EventStore extends StoreComponent{

  @observable events;

  @action loadEvents = ( heroName ) => {
     //this.loadingHero = true;
     //send hero api request
     var StoreRef = this;
     var agent = this.parent.agent_events;
     return agent.loadHeroEvents( heroName )
     .then(action( (events)  => { this.events = events;}))

 } 
  
}