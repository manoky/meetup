import React, { Component } from 'react';

class NumberOfEvents extends Component {

  render() {

    return(
      <div className=".number-of-events">
        <input
          type="number"
          className="totalEvents"
        />
      </div>
    )
  }
}

export default NumberOfEvents;
