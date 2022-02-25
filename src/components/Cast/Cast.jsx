import React from 'react';
import { getCast } from '../../api/movies-api';
import PropTypes from 'prop-types'


import styles from './Cast.module.css';

class Cast extends React.Component {

  static propTypes = {
    movieId: PropTypes.string.isRequired,
  }

  state = {
    cast: [],
  };

  componentDidMount() {
    getCast(this.props.movieId)
      .then(res => {
        res.length = 20;
        this.setState({
          cast: res,
        });
      });
  }

  render() {
    return (
      <>
        {this.state.cast[0] && (
          <ul>
            {this.state.cast.map(actor => (
              <li key={actor.name}>
                <img
                  className={styles.actorImage}
                  src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                  alt={actor.name}
                />
                <h3>{actor.name}</h3>
                <h3>Character: {actor.character}</h3>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Cast;
