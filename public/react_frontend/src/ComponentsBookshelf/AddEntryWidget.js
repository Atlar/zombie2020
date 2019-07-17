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
    const onClickSubmit = this.props.store.entryAddStore.TrySubmitEntry ;
    const onChangeTextHandler = this.props.store.entryAddStore.handleEntryTextChange ;
    const onChangeTitleHandler = this.props.store.entryAddStore.handleEntryTitleChange ;

    return (
      <div className="col-md-9">
        <div>Entry Add</div>
        <input type="text" onChange={onChangeTitleHandler} ></input>
        <textarea onChange={onChangeTextHandler} ></textarea>
        <button onClick={onClickSubmit} >Submit</button>
      </div>
    );
  }
};