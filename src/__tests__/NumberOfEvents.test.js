import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents />', () => {
  test('should render number input field', () => {
    const NumberOfEventsComponent = shallow(<NumberOfEvents />);
    expect(NumberOfEventsComponent.find('input')).toHaveLength(1);
  });
})
