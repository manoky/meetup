import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true,
  }


  handleClick = () => {
    this.setState(prevState => ({collapsed: !prevState.collapsed }))
  }

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return(
      <div className="Event">
        <div>{event.local_time} - {event.local_date}</div>
        <div className="name">{event.name}</div>
        {event.group && event.group.name && <p className="group-name">Group: {event.group.name}</p>}
        <div className="going">
          {event.yes_rsvp_count} people are going
        </div>
        {
          !collapsed &&
          <div className="extra">
            {event.venue && event.venue.name &&
              <p className="address">
                {event.venue.name
                  + ', ' + event.venue.address_1
                  + ', ' + event.venue.city
                  + ', ' + event.venue.localized_country_name
                }
              </p>
            }
            <div className="description" dangerouslySetInnerHTML={{__html: event.description}} />
            <p className="visibility">{event.visibility}</p>
            <a className="link" href={event.link}>Event Link</a>
          </div>
        }
        <button
        className="details-btn" onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details" }</button>
      </div>
    )
  }
}

export default Event;
