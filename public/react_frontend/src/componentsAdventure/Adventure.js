import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom'

@inject('stores')
@withRouter
@observer
export default class Adventure extends React.Component {

  componentWillMount() {
    this.props.appSettingStore.setAppLoaded();
  }

  componentDidMount() {
    alert("loadind events" );
    this.props.stores.eventStore.loadEvents();

    //set regular events update
    setInterval( this.props.stores.eventStore.loadEvents() , 1000);

  }

  render() {
    alert("rendering events" );
    const { currentHero } = this.props.stores.heroStore.currentHero;
    const events = this.props.stores.eventStore.events;

    return (
      <div className="col-md-9">
        <div>
          {currentHero.Name}
        </div>
        <div>
        { 
          events && events.map( (elem , index) => {
            <div key={index}>elem.Description</div>
          } )
        }
        </div>
      </div>
    );
  }
};
