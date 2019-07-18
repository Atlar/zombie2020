import { observable, action } from 'mobx';
import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class EntryStore extends StoreComponent {

    constructor(){
       super();
    } 

    @observable entries;
    entrylastId;

    @action addEntry(){

        this.entries.push({Status:"draft"});
        return this.entries.length-1;

    }
    @action AddEntryProject( ProjectId ){

        const NewEntryId = this.addEntry();
        this.parent.projectStore.addEntryToProject( ProjectId, NewEntryId );
        return NewEntryId;

    }

    @action UpdateEntry = (Id, Entry) =>{

        console.log("update entry");
        this.entries[Id] = { ...this.entries[Id], ...Entry}; 
        console.log(JSON.stringify( this.entries[Id] ));

    }

}