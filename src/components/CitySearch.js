import React, { Component } from 'react';
import { getSuggestions } from '../api';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({ query })
    getSuggestions(query)
      .then(suggestions => this.setState({suggestions}))
  }

  handleClick = (query, lat, lon) => {
    this.setState({ query ,suggestions: []});
    this.props.updateEvents(lat, lon);
  }
  render() {
    const { suggestions } = this.state;

    return(
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <ul className="suggestions">
          {
            suggestions.map(item =>
              <li key={item.name_string}
                onClick={() => this.handleClick(item.name_string, item.lat, item.lon)}
              >
                {item.name_string}
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default CitySearch;
