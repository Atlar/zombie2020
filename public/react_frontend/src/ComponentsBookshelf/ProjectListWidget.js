import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom'

import ProjectWidget from './ProjectWidget'

@inject('store')
@withRouter
@observer
export default class ProjectListWidget extends React.Component {

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

    const projects = this.props.store.projectStore.projects;

    //adding project
    const StartDraftProject = () => this.props.store.projectStore.Draft.NewDraft();
    const draftNewProject = this.props.store.projectStore.Draft.isDrafting;

    const handleTitleChange = (event) => this.props.store.projectStore.Draft.updateField("Title",event.target.value);

    return (
      <div className="col-md-9">
        <div>ProjectListWidget</div>
        <div>
        {projects && projects.map( (el, ind) => {
        return(<ProjectWidget key={ind} index={ind}/>);}) }
        {//create new project
        !draftNewProject && (<button onClick={StartDraftProject}>Add Project</button>)
        }
        {//draft title
        draftNewProject && (<div>
                              <input type="text" onChange={handleTitleChange}></input>
                              <button onClick={StartDraftProject}>Submit new Project</button>
                            </div>)
        }
        </div>
      </div>
    );
  }
};