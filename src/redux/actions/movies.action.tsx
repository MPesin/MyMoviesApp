import {
  FETCH_MOVIES,
  ADD_MOVIE,
  FetchMoviesAction,
  AddMovieAction,
} from '../types';
import {ActionCreator} from 'redux';
import {MovieItem} from '../../services';

export const requestMovies: ActionCreator<FetchMoviesAction> = (
  movies: MovieItem[],
) => {
  return {type: FETCH_MOVIES, payload: movies};
};

export const addMovie: ActionCreator<AddMovieAction> = (
  newMovie: MovieItem,
) => {
  return {type: ADD_MOVIE, payload: newMovie};
};
