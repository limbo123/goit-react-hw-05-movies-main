import React from 'react';
import PropTypes from 'prop-types'

import { getReviews } from "../../api/movies-api"

class Reviews extends React.Component {

  static propTypes = {
    movieId: PropTypes.string.isRequired,
  }
  
  state = {
    reviews: [],
  };

  componentDidMount() {
    getReviews(this.props.movieId)
      .then(res => {
        this.setState({
          reviews: res,
        });
      });
  }

  render() {
    return (
      <>
        {this.state.reviews.length > 0 ? (
          <ul>
            {this.state.reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h3>There is no reviews</h3>
        )}
      </>
    );
  }
}

export default Reviews;
