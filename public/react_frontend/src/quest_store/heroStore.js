import { observable, action } from 'mobx';
//import agent from '../agent';
import agent_adventure from '../agent_adventure';

class HeroStore {


  @observable currentHero;
  @observable loadingHero;
  @observable updatingHero;
  //@observable updatingUserErrors;

  @action loadHero(){
     this.loadingHero = true;
     //send hero api request
     return agent_adventure.current_hero()
     .then(action(({ hero }) => { this.currentHero = hero; }))
     .finally(action(() => { this.loadingHero = false; }))
 } 

  @action updateHero(newHero) {
    this.updatingHero = true;
    return agent_adventure.saveHero(newHero)
      .then(action(({ hero }) => { this.currentHero = hero; }))
      .finally(action(() => { this.updatingHero = false; }))
  }
  
}

export default new HeroStore();