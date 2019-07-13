import { observable, action } from 'mobx';
import agent from '../agent';
import StoreComponent from "../common_store/StoreComponent";

export default class UserStore extends StoreComponent {

    @observable projects
    @observable currentProjectId

}