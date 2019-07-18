import { observable, action } from 'mobx';
import agent from '../agent';

//as function library
export default class aggregatorComponent exte {

    constructor(){
       super();
    } 

    entrylastId;
   
    newId(){
    
       this.entrylastId += 1;
       return this.entrylastId;
       
    }
    

    @action addEntry( Aggregator, Entry ){

        var newId = this.newId();
        Aggregator[newId] = Entry;
        return this.entrylastId;

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