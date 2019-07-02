import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../components/EventList';
import Event from '../components/Event';

describe('<EventList />',() => {
  test('render correct number of events', () => {
    const EventListComponent = shallow(<EventList />);
    EventListComponent.setState({events: [{ id:1 }, { id:2 }, { id:3 }, { id:4 }]});
    expect(EventListComponent.find(Event)).toHaveLength(4)
  });
});
