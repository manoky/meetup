import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../components/CitySearch';


describe('<CitySearch />',() => {
  let CitySearchComponent;
  beforeAll(() => {
    CitySearchComponent = shallow(<CitySearch />);
  });

  test('render text input field', () => {
    expect(CitySearchComponent.find('.city')).toHaveLength(1);
  });

  test('render list of suggestions', () => {
    expect(CitySearchComponent.find('.suggestions')).toHaveLength(1);
  });

  test('Should match text input value prop with state', () => {
    const query = CitySearchComponent.state('query');
    expect(CitySearchComponent.find('.city').prop('value')).toBe(query);
  });

  test('should update state when text input changes', () => {
    const eventObject = { target: {value: 'Berlin' }};
    CitySearchComponent.find('.city').simulate('change', eventObject);
    expect(CitySearchComponent.state('query')).toBe('Berlin')
  });

  test('Should render list of suggestions correctly', () => {
    const suggestions = CitySearchComponent.state('suggestions');
    expect(CitySearchComponent.find('.suggestions li')).toHaveLength(suggestions.length);
    for (let i = 0; i < suggestions.length; i++) {
      expect(CitySearchComponent.find('.suggestions li').at(i).text()).toBe(suggestions[i].name_string);
    }
  });

  test('should change query state when a suggestion is clicked', () => {
    CitySearchComponent.setState({
      suggestions: [
        {
          city: 'Munich',
          country: 'de',
          localized_country_name: 'Germany',
          name_string: 'Munich, Germany',
          zip: 'meetup3',
          lat: 48.14,
          lon: 11.58
        },
        {
          city: 'Munich',
          country: 'us',
          localized_country_name: 'USA',
          state: 'ND',
          name_string: 'Munich, North Dakota, USA',
          zip: '58352',
          lat: 48.66,
          lon: -98.85
        }
      ]
    });

    CitySearchComponent.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchComponent.state('query')).toBe('Munich, Germany');
  })
});
