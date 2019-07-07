import React, { Component } from 'react';
import { getSuggestions } from '../api';
import { InfoAlert } from '../Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  handleChange = (e) => {
    const query = e.target.value;
    const { suggestions } = this.state;
    this.setState({ query })
    getSuggestions(query)
      .then(suggestions => this.setState({suggestions}));

    if (query && suggestions.length === 0) {
      this.setState({
        infoText:'We can not find the city you are looking for. Please try another city',
      })
    } else {
      this.setState({
        infoText: '',
      })
    }
  }

  handleClick = (query, lat, lon) => {
    this.setState({ query ,suggestions: []});
    this.props.updateEvents(lat, lon);
  }
  render() {
    const { suggestions } = this.state;

    return(
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />
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
