import React from 'react';
import { Route, Link } from 'react-router-dom';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import routes from '../../routes';
import { getFilm } from "../../api/movies-api"

import styles from './MovieDetailsPage.module.css';

class MovieDetailsPage extends React.Component {
  state = {
    currentFilm: {},
  };

  componentDidMount() {
    getFilm(this.props.match.params.movieId)
      .then(res => {
        this.setState({
          currentFilm: res,
        });
      });
  }

  handleGoBack = () => {
    this.props.history.push(this.props?.location?.state?.from || '/');
    this.props.history.push(this.props?.location?.state?.search);
  };

  render() {
    return (
      <>
        <button
          className={styles.returnButton}
          type="button"
          onClick={this.handleGoBack}
        >
          Go back
        </button>
        {this.state.currentFilm.title && (
          <>
            <section className={styles.filmDetailsSect}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/original/${this.state.currentFilm.poster_path}`}
                alt={this.state.currentFilm.title}
              />
              <div className={styles.filmDetails}>
                <h1>{this.state.currentFilm.title}</h1>
                <p>User score: {this.state.currentFilm.vote_average}</p>
                <h3>Overview</h3>
                <p>{this.state.currentFilm.overview}</p>
                <h3>Genres</h3>
                <ul>
                  {this.state.currentFilm.genres.map(genre => {
                    return <li key={genre.name}>{genre.name}</li>;
                  })}
                </ul>
              </div>
            </section>
            <section className={styles.AdditionalInfoSect}>
              <h3>Additional Imformation</h3>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/cast`,
                      state: {
                        from: this.props.location.state.from,
                        search: this.props.location.state.search,
                      },
                    }}
                  >
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/reviews`,
                      state: {
                        from: this.props.location.state.from,
                        search: this.props.location.state.search,
                      },
                    }}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </section>

            <Route
              path={routes.cast}
              render={props => (
                <Cast {...props} movieId={this.props.match.params.movieId} />
              )}
            ></Route>
            <Route
              path={routes.reviews}
              render={props => (
                <Reviews {...props} movieId={this.props.match.params.movieId} />
              )}
            ></Route>
          </>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
