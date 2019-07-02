import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<App /> component', () => {
  let AppComponent;
  beforeAll(() => {
    AppComponent = shallow(<App />)
  })
  test('render list of events', () => {
    expect(AppComponent.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppComponent.find(CitySearch)).toHaveLength(1);
  });

  test('Should render NumberOfEvents Component correctly', () => {
    expect(AppComponent.find(NumberOfEvents)).toHaveLength(1);
  })
});
