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
    setInterval( () => this.props.stores.eventStore.loadEvents( "Hedrick" ) , 3500);
    setInterval( () => this.props.stores.heroStore.loadHero( "Hedrick" ), 3500 )

  }

  render() {

    const currentHero = this.props.stores.heroStore.currentHero;

    const events = this.props.stores.eventStore.events;
    //alert("render" + JSON.stringify( events ) );
    console.log(events);

    return (
      <div className="col-md-9">
        {currentHero&&(<div>
                  <div>
                    {currentHero.Name}
                  </div>
                  <div>
                    {currentHero.Xp}
                  </div>
                  <div>
                    <li>Strength {currentHero.Strength }</li>
                    <li>Intellect {currentHero.Intellect }</li>
                    <li>Charisma {currentHero.Charisma }</li>
                  </div>
                  <div>
                    Unspend points: {currentHero.Points}
                  </div>
        </div>)}
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