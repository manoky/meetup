import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query: 'Munich',
    suggestions: []
  }

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({ query })
  }

  handleClick = (query) => {
    this.setState({ query });
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
                onClick={() => this.handleClick(item.name_string)}
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
