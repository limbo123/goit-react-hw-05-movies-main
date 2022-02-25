import axios from 'axios';
import QueryString from 'qs';


axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

export const getTrendings = () => {
  return axios.get(`/trending/movie/week?api_key=${API_KEY}`).then(res => res.data.results)
};

export const getFilm = (id) => {
    return axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`).then(res => res.data)
};

export const getResults = (query) => {
    return axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(res => res.data.results)
};

export const getPreviousResults = (query) => {
    return axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${QueryString.parse(query, {ignoreQueryPrefix: true}).query}&page=1&include_adult=false`)
    .then(res => res.data.results)
};

export const getCast = (id) => {
    return axios.get(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data.cast)
}

export const getReviews = (id) => {
    return axios.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data.results)
}
