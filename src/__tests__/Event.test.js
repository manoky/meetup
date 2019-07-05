import React from 'react';
import { shallow } from 'enzyme';
import Event from '../components/Event';


describe('<Event />', () => {
  let EventComponent;
  let eventProp;
  beforeAll(() => {

    eventProp = {
      "created": 1561541161000,
      "duration": 7200000,
      "id": "262636427",
      "name": "Le Wagon Talk with Philip Petersen on Sales Strategies for a B2B startup.",
      "rsvp_limit": 60,
      "date_in_series_pattern": false,
      "status": "upcoming",
      "time": 1562086800000,
      "local_date": "2019-07-02",
      "local_time": "19:00",
      "updated": 1562055272000,
      "utc_offset": 7200000,
      "waitlist_count": 0,
      "yes_rsvp_count": 23,
      "venue": {
          "id": 26086918,
          "name": "Le Wagon Berlin Coding Bootcamp",
          "lat": 52.50699996948242,
          "lon": 13.39120101928711,
          "repinned": true,
          "address_1": "Rudi-Dutschke-Straße 26",
          "city": "Berlin",
          "country": "de",
          "localized_country_name": "Germany"
      },
      "group": {
          "created": 1480930828000,
          "name": "Le Wagon Berlin - Coding Bootcamp",
          "id": 21449749,
          "join_mode": "open",
          "lat": 52.52000045776367,
          "lon": 13.380000114440918,
          "urlname": "Le-Wagon-Berlin-Coding-Bootcamp",
          "who": "Members",
          "localized_location": "Berlin, Germany",
          "state": "",
          "country": "de",
          "region": "en_US",
          "timezone": "Europe/Berlin"
      },
      "link": "https://www.meetup.com/Le-Wagon-Berlin-Coding-Bootcamp/events/262636427/",
      "description": "<p>*** Registration required on Eventbrite <a href=\"https://lew.ag/b2bsalesstartegiesber\" class=\"linkified\">https://lew.ag/b2bsalesstartegiesber</a> ***</p> <p>For this new talk, we will be pleased to welcome Philip Petersen, ex Google &amp; Rocket Internet, and now Head of Partnerships Jodel.</p> <p>Entrepreneur at heart, Philip started his journey at Google as a Performance Marketer before going to Rocket Internet as the head of sales of a logistics startup. In 2018, he consulted various Berlin startups on growth strategies, before committing to Jodel's challenge of generating revenue.</p> <p>Philip will share with us his advice on Sales Strategies for a B2B startup.</p> <p>We look forward to meeting you soon!<br/>Le Wagon team</p> ",
      "how_to_find_us": "Inside the courtyard, on the right, 5th floor. ",
      "visibility": "public",
      "pro_is_email_shared": false
    }

    EventComponent = shallow(<Event event={eventProp} />);
  });

  test('should render collapsed event on initial render', () => {
    expect(EventComponent.find('.name')).toHaveLength(1);
  })

  test('should render basic event info', () => {
    expect(EventComponent.find('.Event div').at(1).text()).toBe(eventProp.name)

  });

  test('Should render extra details when details button is clicked', () => {
    EventComponent.state('collapsed')
    EventComponent.find('button').simulate('click');
    expect(EventComponent.state('collapsed')).toBe(false);
    expect(EventComponent.find('.extra')).toHaveLength(1);
  })
})
