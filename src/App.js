import React, { Component } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';
import './App.css';


class App extends Component {
  state = {
    events: [],
  }

  isMouted = true;
  componentDidMount() {

    getEvents().then(events => {
      if(this.isMouted){this.setState({ events })}
    });
  }

  componentWillUnmount() {
    this.isMouted = false;
  }

  updateEvents = (lat, lon) => {
    getEvents(lat, lon).then(events => this.setState({ events }))
  }
  render() {
    const { events } = this.state;

    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents />
        <EventList events={events} />
      </div>
    );
  }

}

export default App;
