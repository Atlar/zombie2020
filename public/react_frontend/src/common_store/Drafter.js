import { observable, action } from 'mobx';

import StoreComponent from './StoreComponent';

export default class Drafter extends StoreComponent{
 
    @observable Entity //copy of entity
    @isDrafting //bool

    draftPrototype //exemplar of draft to create. should be set on start

    @action newDraft = () => {
       
        this.Entity = draftPrototype;
      
    }
    //create new prototype and start
    @action StartDraftingNew(){
    
        this.newDraft();
        this.isDrafting = true;
    
    }
    //update or set new fields
    @action UpdateDraft(Update){
    
        this.Entity = { ...this.Entity, ...Update};
    
    } 

} 