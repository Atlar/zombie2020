import { observable, action } from 'mobx';
import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class PojectStore extends StoreComponent {


    constructor(){
       super();
    } 


    @observable projects
    @observable currentProjectId

    //add new Entry to project - for initial setup before network
    @action addEntryToProject( projectId, EntryId ){

        this.projects[projectId].Entries.push(EntryId);

    }

}