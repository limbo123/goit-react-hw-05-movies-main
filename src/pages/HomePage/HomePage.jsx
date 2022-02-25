import React from 'react';
import { Link } from 'react-router-dom';
import { getTrendings } from "../../api/movies-api"

class HomePage extends React.Component {
  state = {
    popularFilms: [],
  };

  componentDidMount() {
    getTrendings()
      .then(results => {
        this.setState({
          popularFilms: results,
        });
      });
  }

  render() {
    return (
      <ul>
        {this.state.popularFilms.map(film => (
          <li key={film.id}>
            <Link
              to={{
                pathname: `/movies/${film.id}`,
                state: {
                  from: this.props.location.pathname,
                },
              }}
            >
              {film.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default HomePage;
