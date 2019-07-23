import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';
import {action} from 'mobx';

import ProjectWidget from './ProjectWidget';

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
    const StartDraftProject = () => this.props.store.projectStore.Drafter.StartDraftingNew();
    const draftNewProject = this.props.store.projectStore.Drafter.isDrafting;

    const draftProject = this.props.store.projectStore.Drafter.Entity;
    const handleTitleChange = (event) => this.props.store.projectStore.Drafter.UpdateDraft({Name:event.target.value});

    const projectDrafter = this.props.store.projectStore.Drafter;
   
    const UpdateProjectCommand = () => {ProjectStore.Agent.commands.UpdateAggregationByAggregatorId({aggregation: "user", subject: "project" , aggregatorId : 1} )
                                        .then( (project) => console.log(project) )
                                        .then( action( (project) => ProjectStore.projects.push(project) ) )
                                        .then( (project) => console.log(ProjectStore.projects) )
                                        };
    
    const SubmitDraft = () => {ProjectStore.Agent.commands.CreateInAggregationRecorded({aggregation: "project" ,id:1, field:"user",object: draftProject} )//post /user/id/project, object
                              .then( action( () => projectDrafter.isDrafting = false ) )
                              .then( () => UpdateProjectCommand() )};

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
                              <input type="text" onChange={handleTitleChange} ></input>
                              <button onClick={SubmitDraft} >Submit new Project</button>
                            </div>)
        }
        </div>
      </div>
    );
  }
};