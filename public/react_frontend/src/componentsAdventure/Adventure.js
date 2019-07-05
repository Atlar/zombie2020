import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom'

@inject('stores')
@withRouter
@observer
export default class Adventure extends React.Component {

  componentWillMount() {
    this.props.stores.appStatusStore.setAppLoaded();
  }

  componentDidMount() {
    
    this.props.stores.eventStore.loadEvents();

    //set regular events update
    setInterval( () => this.props.stores.eventStore.loadEvents() , 3500);

  }

  render() {

    const currentHero = this.props.stores.heroStore.currentHero;

    const events = this.props.stores.eventStore.events;
    alert("render" + JSON.stringify( events ) );
    console.log(events);

    return (
      <div className="col-md-9">
        <div>
          {currentHero.name}
        </div>
        <div>
        { 
          events && events.map( (elem , index) => {
            return( <div key={index}>{elem.event_type+" result: "+elem.status+"("+elem.bonus+"xp)"}</div>)
          })
        }
        </div>
      </div>
    );
  }
};