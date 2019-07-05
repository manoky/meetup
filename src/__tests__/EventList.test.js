import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../components/EventList';
import Event from '../components/Event';

describe('<EventList />',() => {
  test('render correct number of events', () => {
    const events = [{ id:1 }, { id:2 }, { id:3 }, { id:4 }];
    const EventListComponent = shallow(<EventList events={events} />);
    expect(EventListComponent.find(Event)).toHaveLength(4)
  });
});
