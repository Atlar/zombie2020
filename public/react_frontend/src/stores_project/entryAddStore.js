import { observable, action } from 'mobx';
//import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class EntryAddStore extends StoreComponent{

    @observable addView;//bool
    @observable text;
    @observable title;
    @observable entryId;
    @observable updateInProgress;

    //@observable updatingUserErrors;
    
    @action addEntry(){
        //get appropriate agent
        
        const agent = this.parent.agent_object;
        if(agent == 'undefined'){
            console.log("login store on load hero did not find agent_object in parent");
            return;
        }
        
        this.updateInProgress = true;
        const EntryStore = this.parent.entryStore;
        const CurrentEntryId = EntryStore.currentEntryId;
        const ProjectStore = this.parent.projectStore;
        
        const entryAdded = {title: this.title, text: this.text, id: this.entryId};
        //send post object api request
        return agent.postObject( "entry", entryAdded)
        .then(action(( entry ) => {
            //update entry with possible new info
            var ProperEntry = {Text: entry.text, Title: entry.title, ...entry };
            this.parent.entryStore.UpdateEntry(entry.id, ProperEntry);
        }))
        .then(action(() => { this.updateInProgress = false; }))
    } 

    @action handleEntryTextChange = (event) =>{
    
        this.text = event.target.value;
        
    }
    
    @action handleEntryTitleChange = (event) =>{
    
        this.title = event.target.value;
    
    }

    @action switchEntry = (add) => {
    
        this.addView = add;
        console.log( "switch add" );
        console.log( "new " + this.addView);

    }

    //add entry and set edit mode and project Id
    @action StartNewEntry(ProjectId){

        const NewEntryId = this.parent.entryStore.AddEntryProject(ProjectId);
        this.entryId = NewEntryId;
        this.parent.projectStore.currentProjectId = ProjectId;
        this.switchEntry(true);

    }

    @action TrySubmitEntry = () => {
        
        //create entry locally and send to server
        //const projectId = this.parent.projectStore.currentProjectId;
        //const EntryId = this.parent.entryStore.AddEntryProject(projectId);

        //this.entryId = EntryId;

        this.addEntry()
        .then( action( () => this.switchEntry(false) )); 
        
    }
  
}