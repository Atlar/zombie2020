import { observable, action } from 'mobx';
//import agent from '../agent';
import agent_object from './agent_object';
import StoreComponent from "../common_store/StoreComponent";

export default class HeroStore extends StoreComponent{

  @observable currentHero;
  @observable loadingHero;
  @observable updatingHero;
  //@observable updatingUserErrors;
  
  @action loadHero( name ){
     //get appropriate agent
     var agent = this.parent.agent_object;
     if(agent == undefined){
     	alert("hero store on load hero did not find agent_object in parent");
     	return;
     }
     this.loadingHero = true;
     //send hero api request
     return agent.loadById( "hero", name )
     .then(action(( hero ) => { this.currentHero = hero; }))
     .finally(action(() => { this.loadingHero = false; }))
 } 

  @action updateHero(newHero) {
    this.updatingHero = true;
    	var agent = this.parent.agent_object;
    	if(agent == undefined){
    alert("hero store on update hero did not find agent_object in parent");
    return;
    }
    return agent.updateById( "hero", newHero.Name, newHero )
      .then(action(({ hero }) => { this.currentHero = hero; }))
      .finally(action(() => { this.updatingHero = false; }))
  }
  
}