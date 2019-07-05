import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import path from 'path';
import App from '../App';
import { mockEvents } from '../mock-events';
import CitySearch from '../components/CitySearch';

//path.join(__dirname, './src/__features__/')
//const feature = loadFeature('./src/__features__/filterEventsByCity.feature');
const featurePath = (feature ) => path.resolve(__dirname, feature);
const feature = loadFeature(featurePath('filterEventsByCity.feature'));

defineFeature(feature, test => {
  let AppComponent;

  test('By default, when user hasn’t searched for a city, show upcoming events based on the user’s location', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {

    });

    when('the user opens the app', () => {
      AppComponent = mount(<App />)
    });

    then('the user should see the list of upcoming events from their location', () => {
      AppComponent.update();
      expect(AppComponent.find('.Event')).toHaveLength(mockEvents.events.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

    let CitySearchComponent;

    given('the main page is open', () => {
      CitySearchComponent = shallow(<CitySearch />)
    });

    when('user starts typing in the city textbox', () => {
      CitySearchComponent.find('.city').simulate('change', {target: {value: 'Munich' }});
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchComponent.find('.suggestions li')).toHaveLength(2);
    });
  });


  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppComponent;
    given('user was typing “Munich” in the city textbox', () => {
      AppComponent = mount(<App />);
      AppComponent.find('.city').simulate('change',{target: {value: 'Munich' } });
    });

    and('the list of suggested cities is showing', () => {
      AppComponent.update();
      expect(AppComponent.find('.suggestions li')).toHaveLength(2);
    });

    when('the user selects a city (e.g., “Munich, Germany”) from the list', () => {
      AppComponent.find('.suggestions li').first().simulate('click');
    });

    then('their city should be changed to that city (i.e., “Munich, Germany”)', () => {
      const CitySearchComponent = AppComponent.find(CitySearch);
      expect(CitySearchComponent.state('query')).toBe('Munich, Germany');
    });

    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppComponent.find('.Event')).toHaveLength(mockEvents.events.length);
    });
  });



});
