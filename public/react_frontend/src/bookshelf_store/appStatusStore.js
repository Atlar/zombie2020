import { observable, action, reaction } from 'mobx';

class appStatusStore {

  @observable appName = 'Conduit';
  @observable appLoaded = false;

  constructor() {
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new appStatusStore();