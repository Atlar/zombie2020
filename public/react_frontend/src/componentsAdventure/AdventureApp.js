import Header from './Header';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PrivateRoute from './PrivateRoute';

import Adventure from './Adventure';

@inject('commonStore')
@withRouter
@observer
export default class App extends React.Component {

  componentWillMount() {
    
    if (1) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    //if (this.props.commonStore.token) {
    //  this.props.userStore.pullUser()
    //    .finally(() => this.props.commonStore.setAppLoaded());
    //}
  }

  render() {
    window.alert("rendering" );
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <Header />
          <Switch>
            <Route path="/adventure" component={Adventure} />
          </Switch>
        </div>
      );
    }
    return (
      <Header />
    );
  }
}