import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom'

@inject('store')
@withRouter
@observer
export default class UserWidget extends React.Component {

  componentWillMount() {
    this.props.store.appStatusStore.setAppLoaded();
  }

  componentDidMount() {
    
    //this.props.store.userStore.loadUser();
    
    //set regular events update
    //setInterval( () => this.props.stores.eventStore.loadEvents( "Hedrick" ) , 3500);
    //setInterval( () => this.props.stores.heroStore.loadHero( "Hedrick" ), 3500 )

  }

  render() {

    //const currentHero = this.props.stores.heroStore.currentHero;
    const currentUserId = this.props.store.userStore.currentUserId;
    const currentUser = this.props.store.userStore.users[currentUserId];
    //const events = this.props.stores.eventStore.events;
    //alert("render" + JSON.stringify( events ) );
    alert("render user" + JSON.stringify(currentUser);
    return (
      <div className="col-md-9">
        <div>UserWidget</div>
        <div>
        {currentUser&&(<div>
                  <div>
                    {currentUser.Name}
                  </div>
                  
        </div>)}
        </div>
        <div>
        { 
          events && events.map( (elem , index) => {
            return( <div key={index}>{elem.Name+" result: "+elem.Result+"("+elem.Bonus+"xp)"}</div>)
          })
        }
        </div>
      </div>
    );
  }
};