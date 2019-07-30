import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';
import {action} from 'mobx';



@inject('store')
@withRouter
@observer
export default class AddEntryWidget extends React.Component {

  componentWillMount() {
    
  }

  componentDidMount() {
    
    //set regular save MOVE to store
    //setInterval( () => {
       //const editing = this.props.store.entryAddStore.editing;
       //if(!loginView){
       //   this.props.store.entryAddStore.save();
       //} 
    //} , 3500);

  }

  render() {


    const currentUserId = this.props.store.userStore.currentUserId;
    const currentUser = this.props.store.userStore.users[currentUserId];

    const login = this.props.store.loginStore.loginView;
    //const onClickSubmit = this.props.store.entryAddStore.TrySubmitEntry ;
    //const onChangeTextHandler = this.props.store.entryAddStore.handleEntryTextChange ;
    const onChangeTitleHandler = this.props.store.entryAddStore.handleEntryTitleChange ;

	const onChangeTextHandler = (event) => this.props.store.entryStore.Drafter.UpdateDraft({Text:event.target.value});
   
    //submit redefine
    const index = this.props.store.projectStore.currentProjectId;
    const Drafter = this.props.store.entryStore.Drafter;
    Drafter.SubmitAction = () => sidAgentCommands.CreateInAggregationRecorded({aggregation:"entry", id: index, field:"project", object: Drafter.Entity}) 
    .then( action( () => Drafter.isDrafting = false ) )
    .then( () => this.props.store.entryStore.Updater.Update() );
    
    const onClickSubmit = this.props.store.entryStore.Drafter.SubmitAction;

    return (
      <div className="col-md-9">
        <div>Entry Add</div>
        <input type="text" onChange={onChangeTitleHandler} ></input>
        <textarea onChange={onChangeTextHandler} ></textarea>
        <button onClick={Drafter.SubmitAction} >Submit</button>
      </div>
    );
  }
};