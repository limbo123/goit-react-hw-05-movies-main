import React, { lazy, Suspense } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Puff } from  'react-loader-spinner'

import routes from "./routes"

import styles from "./App.module.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));



const App = () => {
  return (
    <>
      <nav className={styles.Navigation}>
        <ul className={styles.NavList}>
          <li className={styles.NavListItem}>
            <NavLink
              to="/"
              exact
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.NavListItem}>
          <NavLink
              to="/movies"
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    <Suspense fallback={<Puff height="60" width="60" color='palevioletred' />}>
      <Switch>
          <Route exact path={routes.home} component={HomePage}></Route>
          <Route path={routes.movieDetails} component={MovieDetailsPage}></Route>
          <Route path={routes.movies} component={MoviesPage}></Route>
          <Route component={HomePage}></Route>
        </Switch>
    </Suspense>
      
    </>
  );
};



export default App;
