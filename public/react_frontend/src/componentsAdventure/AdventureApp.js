import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
//import PrivateRoute from './PrivateRoute';

import Adventure from './Adventure';

@inject("stores")
@withRouter
@observer
export default class AdventureApp extends React.Component {

  componentWillMount() {
    if (1) {
      this.props.stores.appStatusStore.setAppLoaded();
    }
  }

  componentDidMount() {
    
    //if (this.props.commonStore.token) {
    //  this.props.userStore.pullUser()
    //    .finally(() => this.props.commonStore.setAppLoaded());
    //}
  }

  render() {
    
    if (this.props.stores.appStatusStore.appLoaded) {
      return (
        <div>
          <div> Component Header </div>
          <Switch>
              <Adventure/>
          </Switch>
        </div>
      );
    }
    return (
      <div>Unloaded</div>
    );
  }
}