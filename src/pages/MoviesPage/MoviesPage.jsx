import React from 'react';
import { Link } from 'react-router-dom';
import { getResults, getPreviousResults } from "../../api/movies-api"

class MoviesPage extends React.Component {
  state = {
    value: '',
    searchResults: [],
  };

  componentDidMount() {
    if(this.props.location.search !== "") {
      getPreviousResults(this.props.location.search)
      .then(res => {
        this.setState({
          searchResults: res,
        });
      })
      .finally(() => {
        this.setState({
          value: '',
        });
      });
    }
  }

  handleChange = event => {
    this.setState({
      value: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push({
      location: this.props.location.pathname,
      search: `?query=${this.state.value}`,
    })
    getResults(this.state.value)
      .then(res => {
        this.setState({
          searchResults: res,
        });
      })
      .finally(() => {
        this.setState({
          value: '',
        });
      });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>

        <section>
          <ul>
            {this.state.searchResults.map(film => (
              <li key={film.id}>
                <Link
                  to={{
                    pathname: `/movies/${film.id}`,
                    state: {
                      from: this.props.location.pathname,
                      search: this.props.location.search,
                    },
                  }}
                >
                  {film.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}

export default MoviesPage;
