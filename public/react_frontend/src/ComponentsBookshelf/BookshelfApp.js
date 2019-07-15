import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
//import PrivateRoute from './PrivateRoute';

//import ProjectFeed from './ProjectFeed';
import UserWidget from './UserWidget';
import ProjectListWidget from './ProjectListWidget';
//import AddWidget from './AddWidjet';

@inject("store")
@withRouter
@observer
export default class BookshelfApp extends React.Component {

  componentWillMount() {
    if (1) {
      this.props.store.appStatusStore.setAppLoaded();
    }
  }

  componentDidMount() {
    
    //if (this.props.commonStore.token) {
    //  this.props.userStore.pullUser()
    //    .finally(() => this.props.commonStore.setAppLoaded());
    //}
  }

  render() {
    alert("render bookshelf " + JSON.stringify(props.store) );
    if (this.props.store.appStatusStore.appLoaded) {
      return (
        <div>
          <div> Bookshelf Header</div>
          <Switch>
              <div>
              	<UserWidget/>
          		<ProjectListWidget/>
              </div>
          </Switch>
        </div>
      );
    }
    return (
      <div>Unloaded</div>
    );
  }
}