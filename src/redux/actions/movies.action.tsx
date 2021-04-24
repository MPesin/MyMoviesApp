import {
  FETCH_MOVIES,
  ADD_MOVIE,
  FetchMoviesAction,
  AddMovieAction,
} from '../types';
import {ActionCreator} from 'redux';
import {MovieItem} from '../../services';

export const request: ActionCreator<FetchMoviesAction> = (
  movies: MovieItem[],
) => {
  return {type: FETCH_MOVIES, payload: movies};
};

export const add: ActionCreator<AddMovieAction> = (newMovie: MovieItem) => {
  return {type: ADD_MOVIE, payload: newMovie};
};
