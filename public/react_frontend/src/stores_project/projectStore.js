import { observable, action } from 'mobx';
import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class PojectStore extends StoreComponent {


    constructor(props){
       super(props);
    } 


    @observable projects
    @observable currentProjectId

}