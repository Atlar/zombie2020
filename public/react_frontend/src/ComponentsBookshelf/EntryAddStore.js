import { observable, action } from 'mobx';
//import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class EntryAddStore extends StoreComponent{

  @observable addView;//bool
  @observable text;
  @observable title;
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
    
     const entryAdded = {title: this.title, text: this.text, project_id: ProjectStore.currentProjectId};
     //send post object api request
     return agent.postObject( "entry", entryAdded)
     .then(action(( entry ) => {
     //entry add to store
     EntryStore.entries[entry.Id]= entry ;
     //add reference to project
     ProjectStore.projects[entry.ProjectId].Entries.push( entry.Id) ;}))
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
 @action TryAddEntry = () => {
    
     console.log("try add entry call" );
   
     this.addEntry()
     .then( action( () => this.switchEntry(false) )); 
     
 } 
  
}