import { observable, action, reaction } from 'mobx';

class appStatusStore {

  APIRootURL;
  @observable appName = 'Conduit';
  @observable appLoaded = false;

  constructor() {
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new appStatusStore();