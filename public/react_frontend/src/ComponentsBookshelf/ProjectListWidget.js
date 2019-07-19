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
    const ProjectStore = this.props.store.projectStore;
    //adding project
    const StartDraftProject = () => this.props.store.projectStore.Drafter.StartNewDraft();
    const draftNewProject = this.props.store.projectStore.Drafter.isDrafting;

    const draftProject = this.props.store.projectStore.Drafter.Entity;
    const handleTitleChange = (event) => this.props.store.projectStore.Drafter.updateDraft({Name:event.target.value});

    const projectDrafter = this.props.store.projectStore.Drafter;
   
    const UpdateProjectCommand = () => ProjectStore.Agent.sendCommand("UpdateAggregationByAggregatorId", { user , project, 1} );
    
    //const SubmitDraft = () => ProjectStore.Agent.sendCommand("CreateAndAddToAggregation",{ "user", 1, "project", draftProject} )//post /user/id/project, object
    //                          .then( action( () => projectDrafter.isDrafting = false) )
    //                          .then( () => UpdateProjectCommand() );

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
                              <input type="text" onChange={handleTitleChange}>{draftProject.Name}</input>
                              <button onClick={SubmitDraft}>Submit new Project</button>
                            </div>)
        }
        </div>
      </div>
    );
  }
};