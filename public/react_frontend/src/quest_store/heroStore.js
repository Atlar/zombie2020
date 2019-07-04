import { observable, action } from 'mobx';
//import agent from '../agent';
import agent_object from './agent_object';

export default class HeroStore {

  parent;
  agent_object = new agent_object();
  @observable currentHero;
  @observable loadingHero;
  @observable updatingHero;
  //@observable updatingUserErrors;

  constructor( parent ){

    this.parent = parent;
    this.agent_object.appSettingStore = parent.appSettingStore;

  }
  
  @action loadHero(){
     this.loadingHero = true;
     //send hero api request
     return this.agent_object.loadById( "hero", this.currentHero.name )
     .then(action(({ hero }) => { this.currentHero = hero; }))
     .finally(action(() => { this.loadingHero = false; }))
 } 

  @action updateHero(newHero) {
    this.updatingHero = true;
    return  this.agent_object.updateById( "hero", newHero.name, newHero )
      .then(action(({ hero }) => { this.currentHero = hero; }))
      .finally(action(() => { this.updatingHero = false; }))
  }
  
}