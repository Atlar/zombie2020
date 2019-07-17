import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';
import {action} from 'mobx'

@inject('store')
@withRouter
@observer
export default class LoginForm extends React.Component {

  componentWillMount() {
    
  }

  componentDidMount() {
    
    //this.props.store.userStore.loadUser();
    
    //set regular events update
    
    //setInterval( () => this.props.stores.heroStore.loadHero( "Hedrick" ), 3500 )

  }

  render() {

    //const currentHero = this.props.stores.heroStore.currentHero;
    const currentUserId = this.props.store.userStore.currentUserId;
    const currentUser = this.props.store.userStore.users[currentUserId];
    const testVar = this.props.store.userStore.testVar;
    //const events = this.props.stores.eventStore.events;
    //alert("render" + JSON.stringify( events ) );
    //alert("render user" + JSON.stringify(currentUser) );
    const login = this.props.store.loginStore.loginView;
    const onChangeHandler = this.props.store.loginStore.handleUsernameChange;
    const onClick = this.props.store.loginStore.Trylogin;
    
    return (
      <div className="col-md-9">
        <input type="text" onChange={onChangeHandler} ></input>
        <button onClick={onClick} >Login</button>
      </div>
    );
  }
};