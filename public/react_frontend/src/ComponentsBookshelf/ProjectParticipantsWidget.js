import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';

@inject('store')
@withRouter
@observer
export default class ProjectParticipantsWidget extends React.Component {

  componentWillMount() {
    //this.props.store.appStatusStore.setAppLoaded();
  }

  componentDidMount() {
    
    //this.props.store.userStore.loadUser();
    
    //set regular events update
    //setInterval( () => this.props.stores.eventStore.loadEvents( "Hedrick" ) , 3500);
    //setInterval( () => this.props.stores.heroStore.loadHero( "Hedrick" ), 3500 )

  }

  render() {

    //const currentHero = this.props.stores.heroStore.currentHero;
    //const currentUserId = this.props.store.userStore.currentUserId;
    //const currentUser = this.props.store.userStore.users[currentUserId];
    //const events = this.props.stores.eventStore.events;
    //alert("render" + JSON.stringify( events ) );
    const index = this.props.index;
    const project = this.props.store.projectStore.projects[index];
    //const entries = this.props.store.entryStore.entries;
    const users = this.props.store.userStore.users;
   
    return (
      <div className="col-md-9">
        <div>ProjectParticipants</div>
        {project && (<div>
               {project.Participants && project.Participants.map((el, ind)=>{
               return(<ul key={ind} index={el}>{users[el.User].Name + " role-" +users[el.Role]}</ul> );})}
             </div>
          </div>)}
      </div>
    );
  }
};