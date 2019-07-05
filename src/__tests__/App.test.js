import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';
import { mockEvents } from '../mock-events';

describe('<App /> component', () => {
   /*******************
  * Unit Tests
  *******************/
  describe('<App /> component Unit Tests', () => {
    let AppComponent;
    beforeAll(() => {
      AppComponent = shallow(<App />)
    });

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

 /*******************
  * Integration Tests
  *******************/
  describe('<App /> component Integration Tests', () => {

    test('Should get list of events after user selects a city', async () => {
      const AppComponent = mount(<App />);
      const CitySearchComponent = AppComponent.find(CitySearch);

      AppComponent.instance().updateEvents = jest.fn();
      AppComponent.instance().forceUpdate();

      CitySearchComponent.instance().handleClick('value',1.1, 1.2);
      expect(AppComponent.instance().updateEvents).toHaveBeenCalledTimes(1);
      expect(AppComponent.instance().updateEvents).toHaveBeenCalledWith(1.1, 1.2);
      AppComponent.unmount();
    });

    test('Should change state after get list of events', async () => {
      const AppComponent = shallow(<App />);
      AppComponent.instance().updateEvents(1.1, 1.2);
      await AppComponent.update();
      expect(AppComponent.state('events')).toEqual(mockEvents.events);
    })

    test('Should render correct list of events', () => {
      const AppComponent = mount(<App />);

      AppComponent.setState({events: [{id:1, group:{name: "name"}},{id:2, group:{name: "name2"}},{id:3,group:{name: "name3"}},{id:4,group:{name: "name4"}}]});
      expect(AppComponent.find('.Event')).toHaveLength(4);
      AppComponent.unmount();
    })
  });

});
