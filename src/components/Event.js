import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: false,
  }


  handleClick = () => {
    this.setState({collapsed: true })
  }

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return(
      <div className="Event">
        <li className="collapsed">{event.name}</li>
        <button
        className="Button"
          onClick={this.handleClick}
        >Details</button>

        <div className={collapsed ? "Details" : ""}>

        </div>
      </div>
    )
  }
}

export default Event;
