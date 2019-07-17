import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';

import ProjectEntry from './ProjectEntry';
import ProjectParticipantsWidget from './ProjectParticipantsWidget'
import AddEntryWidget from './AddEntryWidget'

@inject('store')
@withRouter
@observer
export default class ProjectWidget extends React.Component {

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
    const entries = this.props.store.entryStore.entries;
    
    //adding entry
    const editing = this.props.store.entryAddStore.addView;
    const addEntry = () => this.props.store.entryAddStore.CreateNewEntry( index );

    return (
      <div className="col-md-9">
        <div>ProjectWidget</div>
        {project && (<div>
               <div>{project.Name}</div>
             <ProjectParticipantsWidget index={index}/>
             <div>
               {project.Entries && project.Entries.map((el, ind)=>{
               return(<ProjectEntry key={ind} index={el} /> );})}
               {!editing && (<button onClick={addEntry}>AddEntry</button>)}
               {editing && (<AddEntryWidget/>)}
             </div>
          </div>)}
      </div>
    );
  }
};